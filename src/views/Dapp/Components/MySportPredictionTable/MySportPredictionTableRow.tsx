import { FC, ReactText, useRef } from "react";
// import mySportPredictionModel, {
//     status
// } from "../../models/MySportPredictionModel";
import TableData from "../Table/TableData";
import TableRow from "../Table/TableRow";
import { FaAngleRight } from "react-icons/fa";
import { RiArrowRightUpFill, RiArrowRightDownFill } from "react-icons/ri";
import { outcome } from "../../models/MySportPredictionModel";
import useCollapse from "react-collapsed";
import { UserPrediction, status } from "../../application/domain/sportPrediction/entity";
import { useDispatch } from "react-redux";
import { setClaimModal } from "../../application/infrastructure/redux/actions/sportPrediction";
import { STATUS, ToastBody, TYPE } from "../Toast";
import { toast } from "react-toastify";

interface MySportPredictionTableRowProps {
    prediction: UserPrediction;
    maxPredictions: number;
}

const MySportPredictionTableRow: FC<MySportPredictionTableRowProps> = ({
    prediction,
    maxPredictions,
}) => {
    const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
        useCollapse({
          duration: 300
        });

    const pendingToast = useRef("" as ReactText);

    const dispatch = useDispatch()

    const onClaimClick = (e: any) => {
        e.stopPropagation()
        if(prediction.claimed === false) {
            return setClaimModal(true, prediction.id)(dispatch)
        }  else {
            const body = ToastBody("You alredy claimed the reward for this prediction!", STATUS.ERROR, TYPE.ERROR)
            toast.dismiss(pendingToast.current);
            toast(body);
        }
        
    }

    return (
        <>
            <TableRow forTableBody onClick={() => setExpanded((prev) => !prev)}>
                <TableData text={""}>
                    <button
                        className="expand__btn"
                        {...getToggleProps({
                            onClick: () => setExpanded((prev) => !prev)
                        })}
                    >
                        <FaAngleRight
                            className={`angle ${
                                isExpanded ? "angle__rotate" : ""
                            }`}
                        />
                    </button>
                </TableData>
                <TableData text={""}>
                    <span className="match__time">{prediction.time}</span>
                    <span className="match__date">{prediction.date}</span>
                </TableData>
                <TableData text={""}>
                    <div className="teams">
                        <div className="team__one">
                            <span>{prediction.teamA}</span>
                            <img
                                src={prediction.teamALogoUri}
                                alt={prediction.teamA + " logo"}
                            />
                        </div>
                        <div className="team__two">
                            <div className="team__one">
                                <img
                                    src={prediction.teamBLogoUri}
                                    alt={
                                        prediction.teamB + " logo"
                                    }
                                />
                                <span>{prediction.teamB}</span>
                            </div>
                        </div>
                    </div>
                </TableData>
                <TableData text={""}>
                    <span
                        className={`status__${String(prediction.status)
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("__")}`}
                    >
                        {prediction.status as string}
                    </span>
                </TableData>
                <TableData text={""}>
                    <span
                        className={`outcome__${String(prediction.outcome).toLocaleLowerCase()}`}
                    >
                        {prediction.outcome === outcome.UNDETERMINED
                            ? "-"
                            : prediction.outcome}
                    </span>
                </TableData>
                <TableData text={""}>
                    {prediction.outcome === outcome.WON && <button onClick={onClaimClick} className="cliam__win__btn">Claim win</button>}
                </TableData>
            </TableRow>
            <tr {...getCollapseProps()}>
                <TableData text={""} colSpan={6}>
                    <div className="more__details">
                        <div className="stats">
                            <span className="key">Final score</span>
                            <span className="value">
                                {prediction.status === status.PLAYED
                                    ? `${prediction.realTeamAScore} : ${prediction.realTeamBScore}`
                                    : "- : -"}
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">Possession</span>
                            <span className="value">
                                {[status.LIVE, status.PLAYED].includes(
                                    prediction.status as status
                                )
                                    ? `${prediction.teamAPossession}% : ${prediction.teamBPossession}%`
                                    : "- : -"}
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">Win/Loss stats</span>
                            <span className="value">
                                <span className="win">
                                    <RiArrowRightUpFill />{" "}
                                    {[status.LIVE, status.PLAYED].includes(
                                        prediction.status as status
                                    )
                                        ? `${prediction.winPercentage}%`
                                        : "0%"}
                                </span>
                                <span className="loss">
                                    <RiArrowRightDownFill />{" "}
                                    {[status.LIVE, status.PLAYED].includes(
                                        prediction.status as status
                                    )
                                        ? `${prediction.lossPercentage}%`
                                        : "0%"}
                                </span>
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">My prediction</span>
                            <span className="value">{`${prediction.predictedTeamAScore}:${prediction.predictedTeamBScore}`}</span>
                        </div>

                        <div className="stats">
                            <span className="key">Prediction slots</span>
                            <span className="value">{`${prediction.slotsFilled}/${maxPredictions}`}</span>
                        </div>
                    </div>
                </TableData>
            </tr>
        </>
    );
};

export default MySportPredictionTableRow;
