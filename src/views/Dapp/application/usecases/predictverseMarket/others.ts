import { BigNumberish } from "ethers";
import { SendParams } from "../../../hooks/useTransaction";
import { PredictverseMarket } from "../../../typechain";

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

interface WithdrawParams {
    contract: PredictverseMarket;
    tokenIds: BigNumberish[];
    send: (params: SendParams) => Promise<void>;
    callbacks?: { [key: string]: () => void };
}

export const withdraw = (params: WithdrawParams) => {
    const { contract, tokenIds, send, callbacks } = params;
    const method = contract.withdraw;
    const methodParams = [tokenIds];
    const message = `Withdrawing PRED Collateral`;
    send({ method, methodParams, message, callbacks });
};

interface ParamsA {
    contract: PredictverseMarket;
    userAddress: string;
}

export const getUserBorrowDataUsecase = async (
    params: ParamsA
): Promise<> => {
    const { contract, userAddress } = params;

    const userInfo = await contract.getBorrowData(userAddress);
    
    return pool;
};
