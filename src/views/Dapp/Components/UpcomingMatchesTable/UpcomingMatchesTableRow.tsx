import { FC } from "react"
import UpcomingMatchModel from "../../models/UpcomingMatchModel"
import TableData from "../Table/TableData";
import TableRow from "../Table/TableRow";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface UpcomingMatchesTableRowProps {
    match: UpcomingMatchModel;
    openMatchPredictionModal: () => void;
}

const UpcomingMatchesTableRow: FC<UpcomingMatchesTableRowProps> = ({match, openMatchPredictionModal}) => {

  const percentage = (match.taken_slots/match.total_slots * 100)
  console.log("per: ", percentage)
  let trailColor = "#C8304D";
  if(percentage > 30) trailColor = "#D7911D";
  if(percentage > 80) trailColor = "green";
  return (
    <TableRow forTableBody>
        <TableData text={match.time + match.date}>
          <span className="match__time">{match.time}</span>
          <span className="match__date">{match.date}</span>
        </TableData>
        <TableData text="">
          <div className="teams">
            <div className='logos__container'>
                <div className='team__one__logo__container'>
                    <img src = {match.team_one_logo_uri} alt = {`${match.team_one_name} logo`} />
                </div>
                <div className='team__two__logo__container'>
                    <img src = {match.team_two_logo_uri} alt = {`${match.team_two_name} logo`} />
                </div>
            </div>
            <span>{match.team_one_name + " VS " + match.team_two_name}</span>
          </div>
        </TableData>
        <TableData text="">
          <div className="stat__container">
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#e3f9ff",
                trailColor: trailColor
              })}
            />
            <span>{match.taken_slots + "/" + match.total_slots}</span>
          </div>
        </TableData>
        <TableData text="">
            <button
              disabled = { match.taken_slots === match.total_slots}
             className={match.taken_slots < match.total_slots ? "" : "disabled__btn"}
             onClick = {openMatchPredictionModal}
            >
                Predict
            </button>
        </TableData>
    </TableRow>
  );
}

export default UpcomingMatchesTableRow