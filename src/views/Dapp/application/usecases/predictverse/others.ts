import { BigNumberish } from "ethers";
import { SendParams } from "../../../hooks/useTransaction";
import { Predictverse } from "../../../typechain";

interface StakeParams {
    contract: Predictverse;
    pId: number;
    tokenIds: BigNumberish[];
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const stake = (params: StakeParams) => {
    const { contract, pId, tokenIds, send, callbacks } = params;
    const method = contract.deposit;
    const methodParams = [pId, tokenIds];
    const message = `Staking NFTs`;
    send({ method, methodParams, message, callbacks });
};

interface WithdrawParams {
    contract: Predictverse;
    pId: number;
    tokenIds: BigNumberish[];
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const withdraw = (params: WithdrawParams) => {
    const { contract, pId, tokenIds, send, callbacks } = params;
    const method = contract.withdraw;
    const methodParams = [pId, tokenIds];
    const message = `Withdrawing NFTs`;
    send({ method, methodParams, message, callbacks });
};

interface HarvestParams {
    contract: Predictverse;
    pId: number;
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const harvest = (params: HarvestParams) => {
    const { contract, pId, send, callbacks } = params;
    const method = contract.withdraw;
    const methodParams = [pId, []];
    const message = `Harvesting NFT Earnings`;
    send({ method, methodParams, message, callbacks });
};
