import { FC } from 'react'
import UpcomingMatchesTable from '../../Components/UpcomingMatchesTable'

interface UpcomingMatchesProps {
  openMatchPredictionModal: ()=>void
}

const UpcomingMatches: FC<UpcomingMatchesProps> = ({openMatchPredictionModal}) => {
  return (
    <section className='sport__prediction__upcoming__matches'>
      <UpcomingMatchesTable openMatchPredictionModal = {openMatchPredictionModal}/>
    </section>
  )
}

export default UpcomingMatches