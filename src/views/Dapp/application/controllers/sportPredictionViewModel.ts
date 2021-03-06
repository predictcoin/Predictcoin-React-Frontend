import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    SPORT_ORACLE_ADDRESSES,
    SPORT_PREDICTION_ADDRESSES
} from "../../constants/addresses";
import useTransaction from "../../hooks/useTransaction";
import {
    SportOracle__factory,
    SportPrediction__factory
} from "../../typechain";
import { useSportPredictionStore } from "../infrastructure/redux/stores/sportPrediction";
import { useWalletViewModel } from "./walletViewModel";
import { predict as predictUsecase } from "../usecases/sportPrediction/predict";
import { claim as claimUsecase } from "../usecases/sportPrediction/claim";
import { getLivematches as getLiveMatchesAction, incrementMatchFilledSlots } from "../infrastructure/redux/actions/sportPrediction";
import { getUpcomingMatches as getUpcomingMatchesAction } from "../infrastructure/redux/actions/sportPrediction";
import {getNewUpcomingMatch as getNewUpcomingMatchAction} from "../infrastructure/redux/actions/sportPrediction";
import { getUserPastPrediction as getUserPastPredictionAction } from "../infrastructure/redux/actions/sportPrediction";
import { getSportPredicitonData as getSportPredicitonDataAction } from "../infrastructure/redux/actions/sportPrediction";
import { watchEvent } from "../../lib/utils/event";

const useSportPredictionViewModel = () => {
    const sportPredictionStore = useSportPredictionStore();

    const { provider, active, address, signer } = useWalletViewModel();

    const { send } = useTransaction();
    const dispatch = useDispatch();

    const contract = SportPrediction__factory.connect(
        SPORT_PREDICTION_ADDRESSES[
            process.env
                .REACT_APP_ENVIRONMENT as keyof typeof SPORT_PREDICTION_ADDRESSES
        ],
        signer ? signer : provider
    );

    const predict = useCallback(
        (
            eventId: string,
            teamAName: string,
            teamBName: string,
            teamAScore: number,
            teamBScore: number,
            callbacks?: { [key: string]: () => void }
        ) => {
            predictUsecase({
                active,
                teamAName,
                teamBName,
                eventId,
                teamAScore,
                teamBScore,
                contract,
                send,
                callbacks
            });
        },
        [contract, active, send]
    );

    const claim = useCallback(
        (eventIds: string[], callbacks?: { [key: string]: () => void }) => {
            claimUsecase({ active, contract, eventIds, send, callbacks });
        },
        [contract, active, send]
    );

    const getLiveMatches = useCallback(() => {
        getLiveMatchesAction(contract)(dispatch);
    }, [contract, dispatch]);

    const getUpcomingMatches = useCallback(() => {
        getUpcomingMatchesAction(contract)(dispatch);
    }, [contract, dispatch]);

    const getNewUpcomingMatch = useCallback((eventId) => {
      getNewUpcomingMatchAction(contract, eventId)(dispatch);
  }, [contract, dispatch]);

    const getUserPastPrediction = useCallback(() => {
        getUserPastPredictionAction(contract, address)(dispatch);
    }, [contract, dispatch, address]);

    const getSportPredicitonData = useCallback(() => {
        getSportPredicitonDataAction(contract)(dispatch);
    }, [contract, dispatch]);



    const initializeEventWatch = useCallback(() => {
        const sportOracleContract = SportOracle__factory.connect(
            SPORT_ORACLE_ADDRESSES[
                process.env
                    .REACT_APP_ENVIRONMENT as keyof typeof SPORT_ORACLE_ADDRESSES
            ],
            provider
        );

        const sportPredictionContract = SportPrediction__factory.connect(
            SPORT_PREDICTION_ADDRESSES[
                process.env
                    .REACT_APP_ENVIRONMENT as keyof typeof SPORT_PREDICTION_ADDRESSES
            ],
            signer ? signer : provider
        );

        // sportOracleContract.removeAllListeners(); // this initializeEventWatch function can get triggered multiple time. this is to ensure event listeners are only added once
        watchEvent(sportOracleContract, "SportEventAdded", [], (eventId) => {
            getNewUpcomingMatch(eventId);
        });

        watchEvent(sportPredictionContract, "PredictionPlaced", [], (eventId, predictor) => {
            // event.removeListener()
            dispatch(incrementMatchFilledSlots(eventId))
            if(address && predictor.toLowerCase() === address.toLowerCase()) {
                getUserPastPrediction();
            }
        });

        watchEvent(sportOracleContract, "SportEventDeclared", [], (eventId) => {
            const pred = sportPredictionStore.userPastPredictions.find(prediction => prediction.id === eventId);
            if(pred) {
                getUserPastPrediction()
            }
        })

        watchEvent(sportOracleContract, "SportEventCancelled", [], (eventId) => {
            getUpcomingMatches();
            const pred = sportPredictionStore.userPastPredictions.find(prediction => prediction.id === eventId);
            if(pred) {
                getUserPastPrediction()
            }
        })
        

        return {sportOracleContract, sportPredictionContract};
        
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[address])

    

    return {
        ...sportPredictionStore,
        predict,
        claim,
        getLiveMatches,
        getUpcomingMatches,
        getUserPastPrediction,
        getSportPredicitonData, 
        initializeEventWatch
    };
};

export default useSportPredictionViewModel;
