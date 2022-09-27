import { PredictverseMarket, ERC721__factory } from "../../../typechain";
import { PredictverseMarketStore } from "../../domain/predictverseMarket/predictverseMarketStore";
import { PRED_NFT_ADDRESSES } from "../../../constants/addresses";
import ERC__721abi from "../../../abis/ERC721.json";
import getNFTs from "../../../lib/utils/getNFTs";
import { BorrowedNFT } from "../../domain/predictverseMarket/entity";
import BigNumber from "bignumber.js";

export const initPredictverseMarketUsecase = async ({
    predictverseMarketContract,
    userAddress
}: {
    predictverseMarketContract: PredictverseMarket;
    userAddress: string;
}): Promise<
    Omit<
        PredictverseMarketStore,
        | "predictverseMarketAvailable"
        | "isLoadingPredictverseMarket"
        | "predictverseMarketAddress"
    >
> => {
    const predNFTAddress: string =
        PRED_NFT_ADDRESSES[
            process.env.REACT_APP_ENVIRONMENT as keyof typeof PRED_NFT_ADDRESSES
        ];

    const predNFTContract = ERC721__factory.connect(
        predNFTAddress,
        predictverseMarketContract.provider
    );

    const availableNFTsInfo = await predictverseMarketContract.getMarketNFTs();

    const availableNFTs = await getNFTs(
        predictverseMarketContract.provider,
        predNFTAddress,
        ERC__721abi,
        availableNFTsInfo.map((token) => token.toNumber())
    );

    const noOfAvailableNFTs = Number(
        await predNFTContract.balanceOf(predictverseMarketContract.address)
    );

    let userBorrowedNFTs: {
        [tokenId: number]: BorrowedNFT;
    } = {};

    if (userAddress) {
        const userInfo = await predictverseMarketContract.getBorrowData(
            userAddress
        );

        userBorrowedNFTs = await getNFTs(
            predictverseMarketContract.provider,
            predNFTAddress,
            ERC__721abi,
            userInfo.map((token) => token.index.toNumber())
        );
    }

    const marketDetails = {
        availableNFTs,
        noOfAvailableNFTs,
        NFTAddress: predNFTAddress,
        userBorrowedNFTs,
        userNoOfBorrowedNFTs: Object.keys(userBorrowedNFTs).length
    };

    return { marketDetails };
};
