import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdStopwatch } from "react-icons/io";
import { RiArrowRightDownFill, RiArrowRightUpFill } from "react-icons/ri";

import CRPShadow from "../../../../assets/pics/CRP.png";
import EndedIllo from "../../../../assets/appSvgs/EndedIllo";
import UnsuccessfulIllo from "../../../../assets/appSvgs/UnsuccessfulIllo";
import DropdownOptions from "./DropdownOptions";
import { coinPredictionOptions } from "../../data/options";
import "./predictiondetails.styles.scss";
import useNextRoundCountdown from "../../hooks/prediction/useNextRoundCountdown";
import { usePredictionViewModel } from "../../application/controllers/predictionViewModel";
import {
    DIRECTION,
    PREDICTIONSTATE
} from "../../application/domain/prediction/entity";
import useCountdown from "../../hooks/prediction/useCountdown";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useToken from "../../hooks/useToken";
import {
    PREDICTION_ADDRESSES,
    PREDICTION_TOKEN_ADDRESSES,
    TOKENS
} from "../../constants/addresses";
import { ethers } from "ethers";
import useTransaction from "../../hooks/useTransaction";
import { displayDecimals, displayTokenValue } from "../../lib/utils/number";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";

const PredictionSkeleton = ({ active }: { active: boolean }) => {
    return (
        <SkeletonTheme
            enableAnimation={true}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
        >
            <div className="prediction_skeleton">
                <Skeleton width="40%" />
                <Skeleton width="80%" />
                <br />
                <Skeleton height="4.5rem" />
                <br />
                <div className="buttons">
                    <Skeleton height="3rem" width="6rem" />
                    <Skeleton height="3rem" width="6rem" />
                </div>
                {active && (
                    <>
                        <br />
                        <Skeleton height="4.7rem" />
                        <br />
                        <div className="buttons">
                            <Skeleton height="2.5rem" width="10rem" />
                            <Skeleton height="2.5rem" width="10rem" />
                        </div>
                    </>
                )}
            </div>
        </SkeletonTheme>
    );
};

interface PredictionDetailsProps {
    activeCard: string;
    setActive: Dispatch<SetStateAction<string>>;
}

// NOTE: The three options for the details are Ongoing, Ended and Unsuccessful.
const PredictionDetails: FC<PredictionDetailsProps> = ({
    activeCard,
    setActive
}) => {
    const {
        available,
        currentRound: _currentRound,
        rounds,
        betSeconds,
        state,
        initPrediction,
        isLoadingCurrent,
        predict,
        betAmount
    } = usePredictionViewModel();
    const { active, chainId, address: userAddress } = useWalletViewModel();
    const { balance, decimals, approve, getAllowance, allowances } = useToken(
        TOKENS[chainId].CRP
    );
    const CRPAllowance =
        allowances[
            PREDICTION_ADDRESSES[
                process.env
                    .REACT_APP_ENVIRONMENT as keyof typeof PREDICTION_ADDRESSES
            ]
        ];
    const { send } = useTransaction();
    const currentRound = rounds[_currentRound];
    const hasBet = currentRound?.user ? true : false;

    // let status = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY;
    let status;
    let time, width, message;
    const nextRoundCountdown = useNextRoundCountdown();

    const currentRoundCountdown = useCountdown(
        currentRound ? currentRound.lockedTimestamp.toNumber() : 0,
        currentRound ? currentRound.closeTimestamp.toNumber() : 0
    );
    const betCountdown = useCountdown(
        currentRound ? currentRound.lockedTimestamp.toNumber() : 0,
        currentRound
            ? betSeconds.add(currentRound.lockedTimestamp).toNumber()
            : 0
    );

    useEffect(() => {
        if (active) {
            getAllowance(
                PREDICTION_ADDRESSES[
                    process.env
                        .REACT_APP_ENVIRONMENT as keyof typeof PREDICTION_ADDRESSES
                ]
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CRPAllowance, userAddress]);

    useEffect(() => {
        if (!available && !isLoadingCurrent) initPrediction();
        else if (active) {
            initPrediction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, userAddress]);

    if (available) {
        switch (state) {
            case PREDICTIONSTATE.BETTING_ONGOING:
                time = betCountdown.countdown;
                width = betCountdown.width;
                message = "PREDICTION ENDS IN:";
                status = "ongoing_betting";
                break;
            case PREDICTIONSTATE.ROUND_ONGOING:
                message = "LIVE ROUND ENDS IN:";
                time = currentRoundCountdown.countdown;
                width = currentRoundCountdown.width;
                status = "ongoing_round";
                break;
            case PREDICTIONSTATE.ROUND_ENDED_UNSUCCESSFULLY:
                message = "NEXT ROUND BEGINS IN:";
                time = nextRoundCountdown.countdown;
                width = nextRoundCountdown.width;
                status = "";
                break;
            default:
                message = "NEXT ROUND BEGINS IN:";
                time = nextRoundCountdown.countdown;
                width = nextRoundCountdown.width;
                status = "ended";
        }
    }

    const activeCoin = coinPredictionOptions.filter(
        (coin) => coin.id === activeCard
    )[0];
    const lockedPrice = currentRound
        ? currentRound[
              state === PREDICTIONSTATE.BETTING_ONGOING ||
              state === PREDICTIONSTATE.ROUND_ONGOING
                  ? "lockedPrices"
                  : "closePrices"
          ][currentRound._tokens.indexOf(activeCoin.address)].toNumber() /
          10 ** 8
        : 0;

    return !available ? (
        <PredictionSkeleton active={active} />
    ) : (
        <div className="prediction__details__content">
            <p className="title">start prediction</p>
            <p className="subtitle">
                Enter prediction pools by entering up or down price predictions
            </p>

            <div
                className={`staking__round__timing ${
                    status === "ongoing_round" || status === "ongoing_betting"
                        ? "ongoing"
                        : "next__round"
                }`}
            >
                <p className="time__counter">
                    <span>
                        <IoMdStopwatch />
                        {message}
                    </span>
                    <span className="time">{time}</span>
                </p>
                <div className="progress__bar">
                    <div className="elapsed" style={{ width }}></div>
                </div>
            </div>
            <div
                className={`details__body ${
                    status === "ongoing_round" || status === "ongoing_betting"
                        ? "ongoing"
                        : "next__round"
                }`}
            >
                {status === "ongoing_round" || status === "ongoing_betting" ? (
                    <>
                        <div className="predict">
                            <div className="select__coin">
                                <p>Select coin to predict</p>
                                <DropdownOptions
                                    options={coinPredictionOptions}
                                    value={activeCoin}
                                    onChange={setActive}
                                />
                            </div>

                            <div className="locked__position">
                                <p>locked position</p>
                                <h4 className="value">${lockedPrice}</h4>
                            </div>
                        </div>
                        {active && status === "ongoing_betting" && (
                            <>
                                <div className="available__balance">
                                    <div className="top">
                                        <p>
                                            <span>available balance: </span>{" "}
                                            {displayDecimals(
                                                ethers.utils.formatUnits(
                                                    balance,
                                                    decimals
                                                ),
                                                5
                                            )}
                                        </p>
                                        <img
                                            src={CRPShadow}
                                            alt="pred-logo"
                                            className="crp-logo"
                                        />
                                    </div>
                                    <p className="note">
                                        You will be charged{" "}
                                        {displayTokenValue(
                                            betAmount.toString(),
                                            18,
                                            1
                                        )}{" "}
                                        CRP for each pool entered
                                    </p>
                                </div>

                                {!CRPAllowance ||
                                !CRPAllowance.gt(betAmount) ? (
                                    <button
                                        className={`enable ${
                                            !CRPAllowance && "disable"
                                        }`}
                                        onClick={() =>
                                            approve(
                                                PREDICTION_ADDRESSES[
                                                    process.env
                                                        .REACT_APP_ENVIRONMENT as keyof typeof process.env.REACT_APP_ENVIRONMENT
                                                ],
                                                ethers.constants.MaxUint256
                                            )
                                        }
                                    >
                                        Enable CRP
                                    </button>
                                ) : (
                                    <div className="buttons">
                                        <button
                                            className={`down ${
                                                (balance.lt(betAmount) ||
                                                    hasBet) &&
                                                "disabled"
                                            }`}
                                            onClick={() =>
                                                predict(
                                                    activeCoin.value as keyof typeof PREDICTION_TOKEN_ADDRESSES,
                                                    DIRECTION.BEAR,
                                                    send
                                                )
                                            }
                                        >
                                            <RiArrowRightDownFill />
                                            enter down
                                        </button>
                                        <button
                                            className={`up ${
                                                (balance.lt(betAmount) ||
                                                    hasBet) &&
                                                "disabled"
                                            }`}
                                            onClick={() =>
                                                predict(
                                                    activeCoin.value as keyof typeof PREDICTION_TOKEN_ADDRESSES,
                                                    DIRECTION.BULL,
                                                    send
                                                )
                                            }
                                        >
                                            <RiArrowRightUpFill />
                                            enter up
                                        </button>

                                        <span>
                                            {balance.lt(betAmount) &&
                                                !hasBet &&
                                                "You do not have enough to bet"}
                                        </span>
                                        <span>
                                            {hasBet &&
                                                "You have predicted, results will be out on Friday by 1pm UTC."}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {status === "ended" ? (
                            <EndedIllo />
                        ) : (
                            <UnsuccessfulIllo />
                        )}
                        <p className="round__status__title">
                            {status === "ended"
                                ? "This round has ended"
                                : "This round was unsuccessful"}
                        </p>
                        <p className="round__status__desc">
                            {status === "ended"
                                ? "The next round will begin 1pm UTC on Friday."
                                : "This is on us and we are indeed sorry, you can claim the tokens for this round and try predicting agian on Friday 1pm UTC."}
                        </p>
                        <Link to='/price-prediction/my-predictions'>See my predictions</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default PredictionDetails;
