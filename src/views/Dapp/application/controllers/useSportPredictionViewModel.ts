import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SPORT_PREDICTION_ADDRESSES } from "../../constants/addresses";
import useTransaction from "../../hooks/useTransaction";
import { SportPrediction__factory } from "../../typechain";
import { useSportPredictionStore } from "../infrastructure/redux/stores/sportPrediction";
import { useWalletViewModel } from "./walletViewModel";
import { predict as predictUsecase } from "../usecases/sportPrediction/predict";
import { claim as claimUsecase } from "../usecases/sportPrediction/claim";
import { getLivematches as getLiveMatchesAction } from "../infrastructure/redux/actions/sportPrediction";
import { getUpcomingMatches as getUpcomingMatchesAction } from "../infrastructure/redux/actions/sportPrediction";
import { getUserPastPrediction as  getUserPastPredictionAction} from "../infrastructure/redux/actions/sportPrediction";
import { getSportPredicitonData as getSportPredicitonDataAction } from "../infrastructure/redux/actions/sportPrediction";

const useSportPredictionViewModel = () => {
    const sportPredictionStore = useSportPredictionStore();
    const {
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
        teamAName: string,
        teamBName: string,
        teamAScore: number,
        teamBScore: number,
        callbacks?: { [key: string]: () => void }
        ) => {
        predictUsecase({active, teamAName, teamBName, eventId, teamAScore, teamBScore, contract, send, callbacks})
      },
      [contract, active, send],
    )

    const claim = useCallback((
        eventIds: string[],
        callbacks?: { [key: string]: () => void }
        ) => {
        
        claimUsecase({active, contract, eventIds, send, callbacks});

    }, [contract, active, send])

    const getLiveMatches = useCallback(
      () => {
        getLiveMatchesAction(contract)(dispatch)
      },
      [contract, dispatch],
    )

    const getUpcomingMatches = useCallback(() => {
      getUpcomingMatchesAction(contract)(dispatch)
    }, [contract, dispatch])

    const getUserPastPrediction = useCallback(() => {
      getUserPastPredictionAction(contract, address)(dispatch)
    }, [contract, dispatch, address])

    const getSportPredicitonData = useCallback(() => {
      getSportPredicitonDataAction(contract)(dispatch)
    }, [contract, dispatch])
    
    return {
      ...sportPredictionStore,
      liveMatches: Object.keys(liveMatches).map((index:any) => liveMatches[index]),
      upcomingMatches: Object.keys(upcomingMatches).map((index:any) => upcomingMatches[index]),
      userPastPredictions: Object.keys(userPastPredictions).map((index:any) => userPastPredictions[index]),
      predict,
      claim,
      getLiveMatches,
      getUpcomingMatches,
      getUserPastPrediction,
      getSportPredicitonData
    }
};

export default useSportPredictionViewModel;
