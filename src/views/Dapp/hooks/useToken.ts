import { useWalletViewModel } from "../application/controllers/walletViewModel";
import { ERC20__factory } from "../typechain/factories/ERC20__factory";
import { useEffect, useState } from "react";
import useTransaction from "./useTransaction";
import { BigNumber, ethers } from "ethers";
import { ERC20 } from "../typechain";
import { watchEvent } from "../lib/utils/event";

interface Token {
    decimals: number;
    approve: (spender: string, amount: string | BigNumber) => Promise<void>;
    getAllowance: (spender: string) => void;
    allowances: { [key: string]: BigNumber };
    send: (receiver: string, amount: string | BigNumber) => Promise<void>;
    balance: ethers.BigNumber;
    getSymbol: () => Promise<string>;
    getBalance: () => void;
    getAddressBalance: (address: string) => Promise<ethers.BigNumber>;
    contract: ERC20;
}

const useToken = (address: string): Token => {
    const {
        provider,
        signer,
        address: userAddress,
        active
    } = useWalletViewModel();
    const contract = ERC20__factory.connect(address, signer || provider);
    const { send: sendTransaction } = useTransaction();

    const [decimals, setDecimals] = useState(18);
    const [allowances, setAllowance] = useState({});
    const [balance, setBalance] = useState(ethers.BigNumber.from(0));
    const [symbol, setSymbol] = useState("");

    useEffect(() => {
        if (active) {
            (async () => {
                await getDecimals();
                getBalance();
            })();

            //events
            watchEvent(
                contract,
                "Transfer",
                [userAddress],
                (from, to, value, event) => {
                    getBalance();
                }
            );
            watchEvent(
                contract,
                "Approval",
                [userAddress],
                (owner, spender, value, event) => {
                    getAllowance(spender);
                }
            );
            watchEvent(
                contract,
                "Transfer",
                [null, userAddress],
                (from, to, value, event) => {
                    getBalance();
                }
            );
        }

        return () => {
            contract.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    const getDecimals = async () => {
        if (decimals !== 0) return decimals;
        const result = await contract.decimals();
        setDecimals(result);
        return result;
    };

    const getSymbol = async () => {
        if (symbol !== "") return symbol;
        const result = await contract.symbol();
        setSymbol(result);
        return result;
    };

    const getAllowance = async (spender: string) => {
        if (!active) {
            throw new Error("Please connect your wallet");
        }
        const result = await contract.allowance(userAddress, spender);
        setAllowance((allowances) => ({ ...allowances, [spender]: result }));
        return result;
    };

    const getBalance = async () => {
        if (!active) {
            throw new Error("Please connect your wallet");
        }

        const result = await contract.balanceOf(userAddress);
        setBalance(result);
        return result;
    };

    const getAddressBalance = async (address: string) => {
        const result = await contract.balanceOf(address);
        return result;
    };

    const send = async (
        receiver: string,
        amount: string | BigNumber
    ): Promise<void> => {
        const method = contract.transfer;
        const methodParams = [receiver, amount];
        const message = `Send ${amount} ${await getSymbol()}`;
        sendTransaction({ method, methodParams, message });
    };

    const approve = async (
        spender: string,
        amount: string | BigNumber
    ): Promise<void> => {
        const method = contract.approve;
        const methodParams = [spender, amount];
        const message = `Approve ${await getSymbol()} to be spent`;
        await sendTransaction({ method, methodParams, message });
    };

    return {
        getSymbol,
        getBalance,
        getAddressBalance,
        decimals,
        getAllowance,
        allowances,
        send,
        approve,
        balance,
        contract
    };
};

export default useToken;
