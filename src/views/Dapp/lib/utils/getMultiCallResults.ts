import { JsonFragment } from "@ethersproject/abi";
import { ethers } from "ethers";
import MultiCall from "@indexed-finance/multicall";
import { Interface } from "ethers/lib/utils";

const getMultiCallResults = async (
    provider: ethers.providers.Provider,
    address: string,
    abi: Interface | JsonFragment[],
    tokenIterator: number[],
    functionName: string,
    args: any[]
): Promise<number[] | string[]> => {
    const multi = new MultiCall(provider);
    const inputs = [];
    for (let tokenIndex of tokenIterator) {
        inputs.push({
            target: address,
            function: functionName,
            args: [...args, tokenIndex]
        });
    }

    const resultsData = await multi.multiCall(abi, inputs);
    return resultsData[1];
};

export default getMultiCallResults;
