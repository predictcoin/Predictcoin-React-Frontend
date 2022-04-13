import './live_matches.styles.scss'
import { FC } from 'react'
import LiveMatch from './LiveMatch'
import liveMatchData from '../../data/liveMatchesData'

const LiveMatches: FC = () => {
  return (
    <div className="live__matches__container" >
        {liveMatchData.map(data => <LiveMatch key={data.id} {...data} />)}
    </div>
  )
}

export default LiveMatches