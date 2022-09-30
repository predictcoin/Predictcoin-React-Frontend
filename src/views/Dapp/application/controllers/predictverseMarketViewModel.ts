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
    getMarketDetailsAction,
    initPredictverseMarketAction
} from "../infrastructure/redux/actions/predictverseMarket";
import {
    borrow as borrowUsecase,
    payback as paybackUsecase
} from "../usecases/predictverseMarket/others";

import { useWalletViewModel } from "./walletViewModel";
import { Explorers } from "../../constants/explorers";
import { getChainId } from "../../lib/utils/chain";
import { usePredictverseMarketStore } from "../infrastructure/redux/stores/predictverseMarket";

let watchingPredictverseMarket = false; // watching events check

const chainId = getChainId();

const usePredictverseMarketViewModel = () => {
    const predictverseMarketStore = usePredictverseMarketStore();
    const {
        predictverseMarketAvailable,
        isLoadingPredictverseMarket,
        marketDetails
    } = predictverseMarketStore;
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

    const payback = (
        tokenIds: number[],
        callbacks?: { [key: string]: () => void }
    ) => {
        paybackUsecase({
            contract,
            tokenIds,
            send,
            callbacks
        });
    };

    let predictverseBorrowCardData: PredictverseBorrowCardModel = {
        availableNFTs: marketDetails.availableNFTs,
        borrowedNFTs: marketDetails.userBorrowedNFTs,
        noOfAvailableNFTs: marketDetails.noOfAvailableNFTs,
        noOfBorrowedNFTs: marketDetails.userNoOfBorrowedNFTs,
        walletUnlockStatus: active
            ? WalletStatus.unlocked
            : WalletStatus.locked,
        contractUrl: `${Explorers[chainId]}address/${contract.address}`,
        NFTAddress: marketDetails.NFTAddress,
        userPREDCollateral: marketDetails.userPREDCollateral,
        singleNFTCollateral: marketDetails.singleNFTCollateral
    };

    const initPredictverseMarket = useCallback(
        () => initPredictverseMarketAction(contract, address, active)(dispatch),
        [dispatch, contract, address, active]
    );
    const getMarketDetailsData = useCallback(
        () => getMarketDetailsAction(contract, address)(dispatch),
        [dispatch, contract, address]
    );

    useEffect(() => {
        if (
            active &&
            predictverseMarketAvailable &&
            address &&
            !isLoadingPredictverseMarket
        ) {
            getMarketDetailsData();
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
            watchEvent(contract, "Borrow", [], async (user, amount, event) => {
                getMarketDetailsData();
            });
            watchEvent(
                contract,
                "Withdraw",
                [],
                async (user, amount, event) => {
                    getMarketDetailsData();
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
        payback
    };
};

export default usePredictverseMarketViewModel;
