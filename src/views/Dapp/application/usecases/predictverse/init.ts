import BigNumber from "bignumber.js";

import { propertiesToNumberLib } from "../../../lib/utils/number";
import { getPREDPrice } from "../../../lib/utils/price";
import { Predictverse, ERC721__factory } from "../../../typechain";
import { Pool } from "../../domain/predictverse/entity";
import {
    predictversePools,
    PredictverseStore
} from "../../domain/predictverse/predictverseStore";
import ERC__721abi from "../../../abis/ERC721.json";
import getNFTs from "../../../lib/utils/getNFTs";

export const initPredictverseUsecase = async ({
    predictverseContract,
    userAddress
}: {
    predictverseContract: Predictverse;
    userAddress: string;
}): Promise<
    Omit<
        PredictverseStore,
        | "predictverseAvailable"
        | "isLoadingPredictverse"
        | "predictverseAddress"
        | "predictverse"
    >
> => {
    const pools: {
        [key: number]: Pool;
    } = {};
    const PREDPrice = await getPREDPrice(predictverseContract.provider);

    const getPId_TotalNFTStaked = async (poolNFTAddress: string) => {
        const predNFTContract = ERC721__factory.connect(
            poolNFTAddress,
            predictverseContract.provider
        );
        const totalNFTStaked = Number(
            await predNFTContract.balanceOf(predictverseContract.address)
        );

        return totalNFTStaked;
    };

    for (let i = 0; i < predictversePools.length; i++) {
        const pool = propertiesToNumberLib(
            await predictverseContract.poolInfo(predictversePools[i])
        );
        pool.NFTAddress = pool.nft;
        delete pool.nft;
        pool.pId = predictversePools[i];
        pool.totalNFTStaked = await getPId_TotalNFTStaked(pool.NFTAddress);

        // pool.apr = await stakingApr({ contract, pool, totalAllocPoint });

        if (userAddress) {
            const userInfo = await predictverseContract.getUserInfo(
                userAddress,
                pool.pId
            );
            pool.stakedNFTs = await getNFTs(
                predictverseContract.provider,
                pool.NFTAddress,
                ERC__721abi,
                userInfo.tokens.map((token) => token.toNumber())
            );
            pool.userStaked = new BigNumber(userInfo.amount.toString());
            pool.user$Staked = PREDPrice.times(pool.userStaked);
            pool.userEarnings = new BigNumber(
                (
                    await predictverseContract.pendingPred(
                        pool.pId,
                        userAddress
                    )
                ).toString()
            );
            pool.$userEarnings = pool.userEarnings.times(PREDPrice);
        }
        pools[pool.pId] = pool;
    }

    return {
        pools
    };
};
