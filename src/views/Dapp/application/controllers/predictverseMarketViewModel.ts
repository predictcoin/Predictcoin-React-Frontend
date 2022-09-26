import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PREDICTVERSE_MARKET_ADDRESSES } from "../../constants/addresses";
import { NODE_ENV } from "../../hooks/predictverse/useERC721";
import useTransaction from "../../hooks/useTransaction";
import { watchEvent } from "../../lib/utils/event";
import PredictverseBorrowCardModel, {
    WalletStatus
} from "../../models/PredictverseBorrowCardModel";
import { PredictverseMarket__factory } from "../../typechain";
import {
    getBorrowAction,
    initPredictverseMarketAction
} from "../infrastructure/redux/actions/predictverseMarket";
import {
    borrow as borrowUsecase,
    withdraw as withdrawUsecase
} from "../usecases/predictverseMarket/others";

import { useWalletViewModel } from "./walletViewModel";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import { usePredictverseMarketStore } from "../infrastructure/redux/stores/predictverseMarket";

let watchingPredictverseMarket = false; // watching events check

const chainId = getChainId();

const usePredictverseMarketViewModel = () => {
    const predictverseMarketStore = usePredictverseMarketStore();
    const { predictverseMarketAvailable, isLoadingPredictverseMarket, predictverseMarketAddress, marketDetails } =
        predictverseMarketStore;
    const { provider, active, address, signer } = useWalletViewModel();
    const contract = PredictverseMarket__factory.connect(
        PREDICTVERSE_MARKET_ADDRESSES[
            process.env.REACT_APP_ENVIRONMENT as NODE_ENV
        ],
        signer ? signer : provider
    );
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const borrow = (
        tokenIds: number[],
        callbacks?: { [key: string]: () => void }
    ) => {
        borrowUsecase({
            contract,
            tokenIds,
            send,
            callbacks
        });
    };

    const withdraw = (
        tokenIds: number[],
        callbacks?: { [key: string]: () => void }
    ) => {
        withdrawUsecase({
            contract,
            tokenIds,
            send,
            callbacks
        });
    };

    let predictverseBorrowCardData: PredictverseBorrowCardModel = {
        NFTsAvailableToBorrow: 0,
        NFTsBorrowed: 0,
        totalPREDCollateral: totalPREDCollateral ? totalPREDCollateral : "0",
        walletUnlockStatus: active
            ? WalletStatus.unlocked
            : WalletStatus.locked,
        contractUrl: `${Explorers[chainId]}address/${contract.address}`,
        NFTAddress: marketDetails.NFTAddress,
    };

    const initPredictverseMarket = useCallback(
        () => initPredictverseMarketAction(contract, address, active)(dispatch),
        [dispatch, contract, address, active]
    );
    const getBorrowedData = useCallback(
        (pId: number) => getBorrowAction(contract, address)(dispatch),
        [dispatch, contract, address]
    );

    useEffect(() => {
        if (
            active &&
            predictverseMarketAvailable &&
            !isLoadingPredictverseMarket
        ) {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, active]);

    useEffect(() => {
        if (
            predictverseMarketAvailable &&
            !isLoadingPredictverseMarket &&
            !watchingPredictverseMarket
        ) {
            contract.removeAllListeners();
            //events
            watchEvent(
                contract,
                "Borrow",
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
            watchingPredictverseMarket = true;
        }

        return () => {
            contract.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [predictverseMarketAvailable]);

    //watch Events

    return {
        ...predictverseMarketStore,
        initPredictverseMarket,
        predictverseBorrowCardData,
        borrow,
        withdraw
    };
};

export default usePredictverseMarketViewModel;
