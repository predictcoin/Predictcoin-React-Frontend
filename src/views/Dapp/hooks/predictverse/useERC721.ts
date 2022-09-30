import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import { PREDICTVERSE_ADDRESSES } from "../../constants/addresses";
import { watchEvent } from "../../lib/utils/event";
import { ERC721__factory } from "../../typechain";
import useTransaction from "../useTransaction";
import ERC__721abi from "../../abis/ERC721.json";
import getMultiCallResults from "../../lib/utils/getMultiCallResults";
import getNFTs from "../../lib/utils/getNFTs";

export type NODE_ENV = "mainnet" | "testnet" | "staging";

const useERC721 = (address: string) => {
    const { send: sendTransaction } = useTransaction();
    const {
        provider,
        signer,
        address: userAddress,
        active
    } = useWalletViewModel();
    const contract = ERC721__factory.connect(address, signer || provider);

    const [userNFTs, setUserNFTs] = useState<{
        [tokenId: number]: {
            tokenId: number;
            imgUrl: string;
        };
    }>({});
    const [nameSymbol, setNameSymbol] = useState<{
        name: string;
        symbol: string;
    }>({
        name: "",
        symbol: ""
    });
    const [balance, setBalance] = useState(ethers.BigNumber.from(0));
    const [allowed, setAllowed] = useState<boolean>(false);

    const getBalance = async () => {
        if (!active) {
            throw new Error("Please connect your wallet");
        }
        if (Boolean(balance.toNumber() === 0)) {
            const result = await contract.balanceOf(userAddress);
            setBalance(result);
            return result;
        } else {
            return balance;
        }
    };

    const getAllowed = async (operator: string) => {
        if (!active) {
            throw new Error("Please connect your wallet");
        }
        const result = await contract.isApprovedForAll(userAddress, operator);
        setAllowed(result);
        return result;
    };

    const getNameSymbol = async () => {
        if (!active) {
            return;
        }
        const name = await contract.name();
        const symbol = await contract.symbol();

        setNameSymbol({ name, symbol });
    };

    const getUserNFTs = async () => {
        if (!active) {
            throw new Error("Please connect your wallet");
        }
        const tokenIndexes = [];
        let userNFTBalance = balance;

        userNFTBalance = await getBalance();

        for (let i = 0; i < userNFTBalance.toNumber(); i++) {
            tokenIndexes.push(i);
        }

        const tokenIds = await getMultiCallResults(
            provider,
            address,
            ERC__721abi,
            tokenIndexes,
            "tokenOfOwnerByIndex",
            [userAddress]
        );

        const userNFTs = await getNFTs(
            provider,
            address,
            ERC__721abi,
            tokenIds as number[]
        );

        setUserNFTs(userNFTs);
        return userNFTs;
    };

    const approve = async (
        operator: string,
        approved: boolean
    ): Promise<void> => {
        const method = contract.setApprovalForAll;
        const methodParams = [operator, approved];
        const message = `Approve NFTs to be staked`;
        await sendTransaction({ method, methodParams, message });
    };

    useEffect(() => {
        if (active) {
            (async () => {
                await getAllowed(
                    PREDICTVERSE_ADDRESSES[
                        process.env.REACT_APP_ENVIRONMENT as NODE_ENV
                    ]
                );
                await getBalance();
                await getNameSymbol();
                getUserNFTs();
            })();

            //events
            watchEvent(
                contract,
                "ApprovalForAll",
                [userAddress],
                (owner, spender, value, event) => {
                    getAllowed(spender);
                }
            );

            watchEvent(
                contract,
                "Transfer",
                [],
                (owner, spender, value, event) => {
                    if (
                        owner.toLowerCase() ===
                            userAddress.toLocaleLowerCase() ||
                        spender.toLowerCase() === userAddress.toLowerCase()
                    ) {
                        getUserNFTs();
                    }
                }
            );
        }

        return () => {
            contract.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    return {
        balance,
        allowed,
        approve,
        getAllowed,
        nameSymbol,
        userNFTs,
        getUserNFTs,
        getBalance
    };
};

export default useERC721;
