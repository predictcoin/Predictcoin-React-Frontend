import { JsonFragment } from "@ethersproject/abi";
import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import getMultiCallResults from "./getMultiCallResults";

export const getNFTs = async (
    provider: ethers.providers.Provider,
    address: string,
    abi: Interface | JsonFragment[],
    tokenIds: number[]
) => {
    const tokenURIStrings = await getMultiCallResults(
        provider,
        address,
        abi,
        tokenIds,
        "tokenURI",
        []
    );

    const NFTs: {
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    } = {};

    for (let i = 0; i < tokenURIStrings.length; i++) {
        const NFTResponse = await fetch(
            `https://ipfs.io/ipfs/${(tokenURIStrings[i] as string).substring(
                7
            )}`
        );
        const NFTData = await NFTResponse.json();
        const NFTImageUrl = NFTData.image;

        const NFTKey = tokenIds[i];

        NFTs[NFTKey] = {
            tokenId: NFTKey,
            imgUrl: `https://ipfs.io/ipfs/${NFTImageUrl.substring(7)}`
        };
    }

    return NFTs;
};
// => Get NFTs (array of tokenIds)
// call tokenURi

export default getNFTs;
