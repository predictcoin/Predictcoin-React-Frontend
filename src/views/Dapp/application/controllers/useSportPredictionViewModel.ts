import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SPORT_PREDICTION_ADDRESSES } from "../../constants/addresses";
import useTransaction, { SendParams } from "../../hooks/useTransaction";
import { SportPrediction__factory } from "../../typechain";
import { useSportPredictionStore } from "../infrastructure/redux/stores/sportPrediction";
import { useWalletViewModel } from "./walletViewModel";
import { predict as predictUsecase } from "../usecases/sportPrediction/predict";
import { claim as claimUsecase } from "../usecases/sportPrediction/claim";
import { getLivematches as getLiveMatchesAction } from "../infrastructure/redux/actions/sportPrediction";

const useSportPredictionViewModel = () => {
    const sportPredictionStore = useSportPredictionStore();
    const {
        isLoadingUpcomingMatches,
        isLoadingUserPastPredictions,
        isloadingLiveMatches,
        liveMatches,
        upcomingMatches,
        userPastPredictions
    } = sportPredictionStore;

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

    const predict = useCallback((
        eventId: string,
        teamAScore: number,
        teamBScore: number,
        // send: (params: SendParams) => Promise<void>,
        callbacks?: { [key: string]: () => void }
        ) => {
        // send the transaction here
        predictUsecase({active, eventId, teamAScore, teamBScore, contract, send, callbacks})
      },
      [contract, address],
    )

    const Claim = useCallback((
        eventIds: string[],
        // send: (params: SendParams) => Promise<void>,
        callbacks?: { [key: string]: () => void }
        ) => {
        
        claimUsecase({active, contract, eventIds, send, callbacks});

    }, [contract, active])

    const getLiveMatches = useCallback(
      () => {
        getLiveMatchesAction(contract)(dispatch)
      },
      [contract, dispatch],
    )
    
    
};

export default useSportPredictionViewModel;
