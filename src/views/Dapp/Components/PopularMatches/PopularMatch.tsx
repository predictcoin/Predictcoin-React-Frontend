import { FC } from 'react'
import popularMatch from '../../models/PopularMatcheModel'
import {BiChevronRight} from 'react-icons/bi'

interface PopularMatchProps extends popularMatch {
  openMatchPredictionModal: () => void;
}

const PopularMatch: FC<PopularMatchProps> = (props) => {
  const {team_one_name, team_two_name, team_one_logo_uri, team_two_logo_uri, time_left, openMatchPredictionModal} = props;
  return (
    <div className='popular__match__card'>
      <div className='popular__match__card__head'>
            <div className='live__in'>
                <span>Live in: </span>
                <span className='time__left'>{time_left}</span>
            </div>
            <button className='action__btn' onClick ={() => openMatchPredictionModal()}>
              <BiChevronRight />
            </button>
        </div>
        <div className='popular__match__card__body'>
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
                </div>
                <div className = 'team__two'>
                    <span className='name'>{team_two_name}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopularMatch