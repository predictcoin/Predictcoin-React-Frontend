import { PredictverseMarket, ERC721__factory } from "../../../typechain";
import { PredictverseMarketStore } from "../../domain/predictverseMarket/predictverseMarketStore";
import { PRED_NFT_ADDRESSES } from "../../../constants/addresses";
import ERC__721abi from "../../../abis/ERC721.json";
import getNFTs from "../../../lib/utils/getNFTs";
import { BorrowedNFT } from "../../domain/predictverseMarket/entity";
import getMultiCallResults from "../../../lib/utils/getMultiCallResults";
import { BigNumber } from "ethers";

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

    const tokenIndexes: number[] = [];

    const noOfAvailableNFTsBig = await predNFTContract.balanceOf(
        predictverseMarketContract.address
    );

    const noOfAvailableNFTs = noOfAvailableNFTsBig.toNumber();

    for (let i = 0; i < noOfAvailableNFTs; i++) {
        tokenIndexes.push(i);
    }

    const tokenIds = await getMultiCallResults(
        predictverseMarketContract.provider,
        predNFTAddress,
        ERC__721abi,
        tokenIndexes,
        "tokenOfOwnerByIndex",
        [predictverseMarketContract.address]
    );

    const availableNFTs = await getNFTs(
        predictverseMarketContract.provider,
        predNFTAddress,
        ERC__721abi,
        tokenIds as number[]
    );

    let userBorrowedNFTs: {
        [tokenId: number]: BorrowedNFT;
    } = {};

    let userPREDCollateral: BigNumber = BigNumber.from(0);

    const singleNFTCollateral = await predictverseMarketContract.collateral();

    if (userAddress) {
        const userInfo = await predictverseMarketContract.getBorrowData(
            userAddress
        );

        userInfo.forEach(
            (info) =>
                (userPREDCollateral = userPREDCollateral.add(info.collateral))
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
        userNoOfBorrowedNFTs: Object.keys(userBorrowedNFTs).length,
        userPREDCollateral,
        singleNFTCollateral: singleNFTCollateral
    };
    return { marketDetails };
};
