import { FC } from 'react'
import liveMatchModel from '../../models/LiveMatchModel'

const LiveMatch: FC<liveMatchModel> = (props) => {
    const {timeGone, team_one_name, team_two_name, team_one_score, team_two_score, team_one_logo_uri, team_two_logo_uri} = props
  return (
    <div className='live__match__card'>
        <div className='live__match__card__head'>
            <div className='live__badge'>
                <span>LIVE</span>
            </div>
            <span className='time__ellapsed'>
                {timeGone}
            </span>
        </div>
        <div className='live__match__card__body'>
            <div className='logos__container'>
                <div className='team__one__logo__container'>
                    <img src = {team_one_logo_uri} alt = {`${team_one_name} logo`} />
                </div>
                <div className='team__two__logo__container'>
                    <img src = {team_two_logo_uri} alt = {`${team_two_name} logo`} />
                </div>
            </div>
            <div className='team__scores'>
                <div className = 'team__one'>
                    <span className='name'>{team_one_name}</span>
                    <span className='score'>{team_one_score}</span>
                </div>
                <div className = 'team__two'>
                    <span className='name'>{team_two_name}</span>
                    <span className='score'>{team_two_score}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LiveMatch