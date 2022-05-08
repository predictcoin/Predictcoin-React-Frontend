import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { FC, ReactText, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import { outcome } from "../../application/domain/sportPrediction/entity";
import ClaimWinModal from "../../Components/CustomModal/ClaimWinModal";
import MySportPredictionTable from "../../Components/MySportPredictionTable";
import { STATUS, ToastBody, TYPE } from "../../Components/Toast";

const Mypredictions: FC = () => {

    const pendingToast = useRef("" as ReactText);
    const [PredictionStat, setPredictionStat] = useState<{
        claimableReward: BigNumber;
        win: number;
        loss: number;
    }>({
        claimableReward: BigNumber.from(0),
        win: 0,
        loss: 0
    });
    const [unclimedPredictionRewardIds, setUnclimedRewardPredictionIds] = useState<string[]>([])

    const {userPastPredictions, predictionAmount, rewardMultiplier, claimModal, claim } =
        useSportPredictionViewModel();

    const temp = JSON.stringify(userPastPredictions);

    useEffect(() => {
        let PredictionStatTemp = {
            claimableReward: BigNumber.from(0),
            win: 0,
            loss: 0,
        };
        const unclimedPredictionRewardIdsTemp:string[] = []
        userPastPredictions.forEach((prediction) => {
            if (
                prediction.outcome === outcome.WON &&
                prediction.claimed === false
            ) {
                PredictionStatTemp = {
                    ...PredictionStatTemp,
                    claimableReward: PredictionStatTemp.claimableReward.add((predictionAmount.mul(rewardMultiplier))
                    )
                };
                unclimedPredictionRewardIdsTemp.push(prediction.id);
            }
            if (prediction.outcome === outcome.WON) {
                PredictionStatTemp = {
                    ...PredictionStatTemp,
                    win: PredictionStatTemp.win + 1
                };
            } else if (prediction.outcome === outcome.LOST) {
                PredictionStatTemp = {
                    ...PredictionStatTemp,
                    loss: PredictionStatTemp.loss + 1
                };
            }
        });
        setPredictionStat(PredictionStatTemp);
        setUnclimedRewardPredictionIds(unclimedPredictionRewardIdsTemp)
        // eslint-disable-next-line
    }, [temp, rewardMultiplier, predictionAmount]);

    const handleWithdraw = () => {
        if(unclimedPredictionRewardIds.length === 0) {
            const body = ToastBody("You have no reward to claim", STATUS.ERROR, TYPE.ERROR)
            toast.dismiss(pendingToast.current);
            toast(body);
        } else {
            claim(unclimedPredictionRewardIds);
        }
    }
    

    return (
        <div className="sport__prediction__my__predictions">
            <section className="sport__prediction__details">
                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Predicted</p>
                        <p className="value">{userPastPredictions.length}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Rounds Won</p>
                        <p className="value">{PredictionStat.win}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Rounds lost</p>
                        <p className="value">{PredictionStat.loss}</p>
                    </div>
                </div>

                <div className="detail">
                    <span className="dot"></span>
                    <div className="title__value">
                        <p className="title">Claimable Reward</p>
                        <p className="value">{formatUnits(PredictionStat.claimableReward, 18)}</p>
                    </div>
                </div>

                <button className={unclimedPredictionRewardIds.length ? "withdraw__btn" : "withdraw__btn grayed"} onClick = {handleWithdraw}>Claim rewards</button>
            </section>

            <section className="my__predictions__table__container">
                <MySportPredictionTable />
                {claimModal.open && (
                    <ClaimWinModal />
                )}
            </section>
        </div>
    );
};

export default Mypredictions;
