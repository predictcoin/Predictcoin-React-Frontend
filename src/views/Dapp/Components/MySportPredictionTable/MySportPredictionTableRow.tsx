import { FC } from "react";
import mySportPredictionModel, {
    status
} from "../../models/MySportPredictionModel";
import TableData from "../Table/TableData";
import TableRow from "../Table/TableRow";
import { FaAngleRight } from "react-icons/fa";
import { RiArrowRightUpFill, RiArrowRightDownFill } from "react-icons/ri";
import { outcome } from "../../models/MySportPredictionModel";
import useCollapse from "react-collapsed";

interface MySportPredictionTableRowProps {
    sportPrediction: mySportPredictionModel;
}

const MySportPredictionTableRow: FC<MySportPredictionTableRowProps> = ({
    sportPrediction
}) => {
    const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
        useCollapse();

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
                    <span className="match__time">{sportPrediction.time}</span>
                    <span className="match__date">{sportPrediction.date}</span>
                </TableData>
                <TableData text={""}>
                    <div className="teams">
                        <div className="team__one">
                            <span>{sportPrediction.team_one_name}</span>
                            <img
                                src={sportPrediction.team_one_logo_uri}
                                alt={sportPrediction.team_one_name + " logo"}
                            />
                        </div>
                        <div className="team__two">
                            <div className="team__one">
                                <img
                                    src={sportPrediction.team_two_logo_uri}
                                    alt={
                                        sportPrediction.team_two_name + " logo"
                                    }
                                />
                                <span>{sportPrediction.team_two_name}</span>
                            </div>
                        </div>
                    </div>
                </TableData>
                <TableData text={""}>
                    <span
                        className={`status__${sportPrediction.status
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("__")}`}
                    >
                        {sportPrediction.status}
                    </span>
                </TableData>
                <TableData text={""}>
                    <span
                        className={`outcome__${sportPrediction.outcome.toLocaleLowerCase()}`}
                    >
                        {sportPrediction.outcome === outcome.UNDETERMINED
                            ? "-"
                            : sportPrediction.outcome}
                    </span>
                </TableData>
            </TableRow>
            <tr {...getCollapseProps()}>
                <TableData text={""} colSpan={5}>
                    <div className="more__details">
                        <div className="stats">
                            <span className="key">Final score</span>
                            <span className="value">
                                {sportPrediction.status === status.PLAYED
                                    ? `${sportPrediction.team_one_score} : ${sportPrediction.team_two_score}`
                                    : "- : -"}
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">Possession</span>
                            <span className="value">
                                {[status.LIVE, status.PLAYED].includes(
                                    sportPrediction.status
                                )
                                    ? `${sportPrediction.team_one_possession}% : ${sportPrediction.team_two_possession}%`
                                    : "- : -"}
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">Win/Loss stats</span>
                            <span className="value">
                                <span className="win">
                                    <RiArrowRightUpFill />{" "}
                                    {[status.LIVE, status.PLAYED].includes(
                                        sportPrediction.status
                                    )
                                        ? `${sportPrediction.win_stats}%`
                                        : "0%"}
                                </span>
                                <span className="loss">
                                    <RiArrowRightDownFill />{" "}
                                    {[status.LIVE, status.PLAYED].includes(
                                        sportPrediction.status
                                    )
                                        ? `${sportPrediction.win_stats}%`
                                        : "0%"}
                                </span>
                            </span>
                        </div>

                        <div className="stats">
                            <span className="key">My prediction</span>
                            <span className="value">5 : 2</span>
                        </div>

                        <div className="stats">
                            <span className="key">Prediction slots</span>
                            <span className="value">10/10</span>
                        </div>
                    </div>
                </TableData>
            </tr>
        </>
    );
};

export default MySportPredictionTableRow;
