import { PredictverseMarket, ERC721__factory } from "../../../typechain";
import { PredictverseMarketStore } from "../../domain/predictverseMarket/predictverseMarketStore";
import { PRED_NFT_ADDRESSES } from "../../../constants/addresses";
import ERC__721abi from "../../../abis/ERC721.json";
import getNFTs from "../../../lib/utils/getNFTs";
import { BorrowedNFT } from "../../domain/predictverseMarket/entity";

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
    const NFTsAvailable = Number(
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
        NFTsAvailable,
        NFTAddress: predNFTAddress,
        userBorrowedNFTs,
        userNoOfBorrowedNFTs: Object.keys(userBorrowedNFTs).length,
        totalPREDCollateral: 0
    };

    return { marketDetails };
};
