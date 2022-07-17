import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PREDICTVERSE_ADDRESSES } from "../../constants/addresses";
import useERC721, { NODE_ENV } from "../../hooks/predictverse/useERC721";
import useTransaction from "../../hooks/useTransaction";
import { watchEvent } from "../../lib/utils/event";
import PredictverseCardModel, {
    WalletStatus
} from "../../models/PredictverseCardModel";
import { Predictverse__factory } from "../../typechain";
import {
    getPredictversePoolAction,
    getUserPoolDetailsAction,
    initPredictverseAction
} from "../infrastructure/redux/actions/predictverse";
import {
    stake as stakeUsecase,
    withdraw as withdrawUsecase,
    harvest as harvestUsecase
} from "../usecases/predictverse/others";

import { usePredictverseStore } from "../infrastructure/redux/stores/predictverse";
import { useWalletViewModel } from "./walletViewModel";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import { predictversePools } from "../domain/predictverse/predictverseStore";

let watchingPredictverse = false; // watching events check

const chainId = getChainId();

const usePredictverseViewModel = () => {
    const predictverseStore = usePredictverseStore();
    const { pools, predictverseAvailable, isLoadingPredictverse } =
        predictverseStore;
    const { provider, active, address, signer } = useWalletViewModel();
    const contract = Predictverse__factory.connect(
        PREDICTVERSE_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as NODE_ENV],
        signer ? signer : provider
    );
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const harvest = (pId: number, callbacks?: { [key: string]: () => void }) =>
        harvestUsecase({ contract, pId, send, callbacks });

    const stake = (
        tokenIds: number[],
        pId: number,
        callbacks?: { [key: string]: () => void }
    ) => {
        stakeUsecase({
            contract,
            pId,
            tokenIds,
            send,
            callbacks
        });
    };

    const withdraw = (
        tokenIds: number[],
        pId: number,
        callbacks?: { [key: string]: () => void }
    ) => {
        withdrawUsecase({
            contract,
            pId,
            tokenIds,
            send,
            callbacks
        });
    };

    let predictverseCardData = predictversePools?.map(
        (pId, index): PredictverseCardModel | undefined => {
            const pool = pools[pId];
            if (pool) {
                const {
                    totalNFTStaked,
                    user$Staked,
                    userEarnings,
                    $userEarnings,
                    stakedNFTs,
                    apr,
                    userStaked,
                    NFTAddress
                } = pool;

                return {
                    id: pId,
                    apr: pool?.apr?.toFixed() ?? 0,
                    stakedNFTs,
                    USDStaked: user$Staked ? user$Staked.toFixed() : "0",
                    staked: userStaked ? userStaked.toFixed() : "0",
                    earned: userEarnings ? userEarnings?.toFixed() : "0",
                    USDEarned: $userEarnings ? $userEarnings?.toFixed() : "0",
                    totalNFTStaked: totalNFTStaked.toFixed(),
                    walletUnlockStatus: active
                        ? WalletStatus.unlocked
                        : WalletStatus.locked,
                    contractUrl: `${Explorers[chainId]}address/${contract.address}`,
                    NFTAddress
                };
            }

            return undefined;
        }
    );

    predictverseCardData = predictverseCardData.filter(
        (data) => data !== undefined
    );

    const initPredictverse = useCallback(
        () => initPredictverseAction(contract, address, active)(dispatch),
        [dispatch, contract, address, active]
    );
    const getPredictversePool = useCallback(
        (pId: number) =>
            getPredictversePoolAction(contract, address, pId)(dispatch),
        [dispatch, contract, address]
    );
    const getUserPoolDetails = useCallback(
        (pId: number) =>
            getUserPoolDetailsAction(contract, address, pools[pId])(dispatch),
        [dispatch, contract, pools, address]
    );

    useEffect(() => {
        if (active && predictverseAvailable && !isLoadingPredictverse) {
            for (let id in pools) {
                getUserPoolDetails(+id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, active]);

    useEffect(() => {
        if (
            predictverseAvailable &&
            !isLoadingPredictverse &&
            !watchingPredictverse
        ) {
            contract.removeAllListeners();
            //events
            watchEvent(
                contract,
                "Deposit",
                [],
                async (user, pid, amount, event) => {
                    if (predictversePools.indexOf(pid.toNumber()) === -1)
                        return;
                    getPredictversePool(pid.toNumber());
                }
            );
            watchEvent(
                contract,
                "Withdraw",
                [],
                async (user, pid, amount, event) => {
                    if (predictversePools.indexOf(pid.toNumber()) === -1)
                        return;
                    getPredictversePool(pid.toNumber());
                }
            );
            watchingPredictverse = true;
        }

        return () => {
            contract.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [predictverseAvailable]);

    //watch Events

    return {
        ...predictverseStore,
        initPredictverse,
        predictverseCardData,
        harvest,
        stake,
        withdraw
    };
};

export default usePredictverseViewModel;
