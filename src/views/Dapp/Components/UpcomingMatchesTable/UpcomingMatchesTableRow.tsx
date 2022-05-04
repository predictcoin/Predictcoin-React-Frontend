import { FC, useEffect, useState } from "react"
import TableData from "../Table/TableData";
import TableRow from "../Table/TableRow";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UpcomingMatch } from "../../application/domain/sportPrediction/entity";
import {useDispatch} from 'react-redux'
import { setPredictMatchModal } from "../../application/infrastructure/redux/actions/sportPrediction";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";

interface UpcomingMatchesTableRowProps {
    match: UpcomingMatch;
    maxPredictions: number
}

const UpcomingMatchesTableRow: FC<UpcomingMatchesTableRowProps> = ({match, maxPredictions}) => {
  
  const dispatch = useDispatch()
  const openMatchPredictionModal = () => {
    setPredictMatchModal(match.id, match.slotsFilled, maxPredictions)(dispatch)
  }

  const [prediction, setPrediction] = useState<string>();

  const {userPastPredictions} = useSportPredictionViewModel()
  useEffect(() => {
    if(userPastPredictions.length === 0) return setPrediction(undefined);
    
    const predictionObj = userPastPredictions.find(prediction => prediction.id === match.id);
    
    if(predictionObj) {
      setPrediction(`You predicted ${predictionObj?.predictedTeamAScore}:${predictionObj?.predictedTeamBScore}`)
    }
  }, [userPastPredictions, match.id])
  
  

  const percentage = (match.slotsFilled/maxPredictions * 100)
  let trailColor = "#C8304D";
  if(percentage > 30) trailColor = "#D7911D";
  if(percentage > 80) trailColor = "#0f970f";
  
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
                    <img src = {match.teamALogoUri} alt = {`${match.teamA} logo`} />
                </div>
                <div className='team__two__logo__container'>
                    <img src = {match.teamBLogoUri} alt = {`${match.teamB} logo`} />
                </div>
            </div>
            <span>{match.teamA + " VS " + match.teamB}</span>
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
            <span>{match.slotsFilled + "/" + maxPredictions}</span>
          </div>
        </TableData>
        <TableData text="">
          {prediction ? <span className="predicted_prediction">{prediction}</span> : 
            <button
             className={match.slotsFilled < maxPredictions ? "" : "disabled__btn"}
             onClick = {openMatchPredictionModal}
            >
          
                Predict
            </button>
          }   
        </TableData>
    </TableRow>
  );
}

export default UpcomingMatchesTableRow