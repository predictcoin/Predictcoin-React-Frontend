import { ERC721__factory, Predictverse } from "../../../typechain";
import { propertiesToNumberLib } from "../../../lib/utils/number";
import { getPREDPrice } from "../../../lib/utils/price";
import BigNumber from "bignumber.js";
import { Pool } from "../../domain/predictverse/entity";
import getNFTs from "../../../lib/utils/getNFTs";
import ERC__721abi from "../../../abis/ERC721.json";

interface ParamsA {
    pool: Pool;
    contract: Predictverse;
    userAddress: string;
}

export const getUserPoolDetailsUsecase = async (
    params: ParamsA
): Promise<Pool> => {
    const { contract, pool, userAddress } = params;
    const PREDPrice = await getPREDPrice(contract.provider);

    const userInfo = await contract.getUserInfo(userAddress, pool.pId);
    pool.stakedNFTs = await getNFTs(
        contract.provider,
        pool.NFTAddress,
        ERC__721abi,
        userInfo.tokens.map((token) => token.toNumber())
    );
    pool.userStaked = new BigNumber(userInfo.amount.toString());
    pool.user$Staked = PREDPrice.times(pool.userStaked);
    pool.userEarnings = new BigNumber(
        (await contract.pendingPred(pool.pId, userAddress)).toString()
    );
    pool.$userEarnings = pool.userEarnings.times(PREDPrice);
    return pool;
};

interface ParamsB {
    pId: number;
    contract: Predictverse;
    userAddress: string;
}

export const getPredictversePoolUsecase = async (
    params: ParamsB
): Promise<Pool> => {
    const { contract, pId, userAddress } = params;
    const PREDPrice = await getPREDPrice(contract.provider);

    const getPId_TotalNFTStaked = async (poolNFTAddress: string) => {
        const predNFTContract = ERC721__factory.connect(
            poolNFTAddress,
            contract.provider
        );
        const totalNFTStaked = Number(
            await predNFTContract.balanceOf(contract.address)
        );

        return totalNFTStaked;
    };

    const pool = propertiesToNumberLib(await contract.poolInfo(pId));
    pool.pId = pId;
    pool.NFTAddress = pool.nft;
    delete pool.nft;
    pool.totalNFTStaked = await getPId_TotalNFTStaked(pool.NFTAddress);
    // pool.apr = await stakingApr({ contract, pool, totalAllocPoint });

    if (userAddress) {
        const userInfo = await contract.getUserInfo(userAddress, pool.pId);
        pool.stakedNFTs = await getNFTs(
            contract.provider,
            pool.NFTAddress,
            ERC__721abi,
            userInfo.tokens.map((token) => token.toNumber())
        );
        pool.userStaked = new BigNumber(userInfo.amount.toString());
        pool.user$Staked = PREDPrice.times(pool.userStaked);
        pool.userEarnings = new BigNumber(
            (await contract.pendingPred(pool.pId, userAddress)).toString()
        );
        pool.$userEarnings = pool.userEarnings.times(PREDPrice);
    }
    return pool;
};
