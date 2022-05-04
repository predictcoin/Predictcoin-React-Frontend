import { FC, useEffect } from 'react'
import useSportPredictionViewModel from '../../application/controllers/sportPredictionViewModel'
import UpcomingMatchesTable from '../../Components/UpcomingMatchesTable'


const UpcomingMatches:FC = () => {

  const { getUpcomingMatches } = useSportPredictionViewModel()
  
  useEffect(() => {
      getUpcomingMatches()
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  



  return (
    <section className='sport__prediction__upcoming__matches'>
      <UpcomingMatchesTable />
    </section>
  )
}

export default UpcomingMatches