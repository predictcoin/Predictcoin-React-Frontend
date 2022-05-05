import { FC } from 'react'
import UpcomingMatchesTable from '../../Components/UpcomingMatchesTable'


const UpcomingMatches:FC = () => {

  return (
    <section className='sport__prediction__upcoming__matches'>
      <UpcomingMatchesTable />
    </section>
  )
}

export default UpcomingMatches