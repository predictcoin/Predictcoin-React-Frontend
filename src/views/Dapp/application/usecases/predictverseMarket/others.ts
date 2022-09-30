import { BigNumber, BigNumberish } from "ethers";

import { PRED_NFT_ADDRESSES } from "../../../constants/addresses";
import ERC__721abi from "../../../abis/ERC721.json";
import { SendParams } from "../../../hooks/useTransaction";
import getNFTs from "../../../lib/utils/getNFTs";
import { ERC721__factory, PredictverseMarket } from "../../../typechain";
import { BorrowedNFT } from "../../domain/predictverseMarket/entity";
import getMultiCallResults from "../../../lib/utils/getMultiCallResults";

interface BorrowParams {
    contract: PredictverseMarket;
    tokenIds: BigNumberish[];
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const borrow = (params: BorrowParams) => {
    const { contract, tokenIds, send, callbacks } = params;
    const method = contract.borrow;
    const methodParams = [tokenIds];
    const message = `Borrow NFTs`;
    send({ method, methodParams, message, callbacks });
};

interface PaybackParams {
    contract: PredictverseMarket;
    tokenIds: BigNumberish[];
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const payback = (params: PaybackParams) => {
    const { contract, tokenIds, send, callbacks } = params;
    const method = contract.withdraw;
    const methodParams = [tokenIds];
    const message = `Payback NFTs`;
    send({ method, methodParams, message, callbacks });
};

interface ParamsA {
    contract: PredictverseMarket;
    userAddress: string;
}

export const getMarketDetailsUsecase = async (
    params: ParamsA
): Promise<{
    availableNFTs: {
        [tokenId: number]: BorrowedNFT;
    };
    userBorrowedNFTs: {
        [tokenId: number]: BorrowedNFT;
    };
    userNoOfBorrowedNFTs: number;
    noOfAvailableNFTs: number;
    NFTAddress: string;
}> => {
    const { contract, userAddress } = params;

    const predNFTAddress: string =
        PRED_NFT_ADDRESSES[
            process.env.REACT_APP_ENVIRONMENT as keyof typeof PRED_NFT_ADDRESSES
        ];

    const predNFTContract = ERC721__factory.connect(
        predNFTAddress,
        contract.provider
    );

    const tokenIndexes: number[] = [];
    const noOfAvailableNFTs = Number(
        await predNFTContract.balanceOf(contract.address)
    );

    for (let i = 0; i < noOfAvailableNFTs; i++) {
        tokenIndexes.push(i);
    }

    const tokenIds = await getMultiCallResults(
        contract.provider,
        predNFTAddress,
        ERC__721abi,
        tokenIndexes,
        "tokenOfOwnerByIndex",
        [contract.address]
    );

    const availableNFTs = await getNFTs(
        contract.provider,
        predNFTAddress,
        ERC__721abi,
        tokenIds as number[]
    );

    let userBorrowedNFTs: {
        [tokenId: number]: BorrowedNFT;
    } = {};

    let userPREDCollateral: BigNumber = BigNumber.from(0);

    const singleNFTCollateral = await contract.collateral();

    if (userAddress) {
        const userInfo = await contract.getBorrowData(userAddress);

        userInfo.forEach(
            (info) =>
                (userPREDCollateral = userPREDCollateral.add(info.collateral))
        );

        userBorrowedNFTs = await getNFTs(
            contract.provider,
            predNFTAddress,
            ERC__721abi,
            userInfo.map((token) => token.index.toNumber())
        );

        for (let key of Object.keys(userBorrowedNFTs)) {
            let token = userInfo.filter(
                (info) => info.index.toNumber() === Number(key)
            );
            userBorrowedNFTs[Number(key)].collateral = token[0].collateral;
        }
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

    return marketDetails;
};
