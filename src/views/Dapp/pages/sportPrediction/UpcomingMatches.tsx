import { FC } from 'react'
import UpcomingMatchesTable from '../../Components/UpcomingMatchesTable'

interface UpcomingMatchesProps {
  openMatchPredictionModal: ()=>void
}

const UpcomingMatches: FC<UpcomingMatchesProps> = ({openMatchPredictionModal}) => {
  return (
    <div className='sport__prediction__upcoming__matches'>
      <UpcomingMatchesTable openMatchPredictionModal = {openMatchPredictionModal}/>
    </div>
  )
}

export default UpcomingMatches