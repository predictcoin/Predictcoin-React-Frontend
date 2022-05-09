import { FC } from 'react'
import { LiveMatch as LiveMatchEntity } from '../../application/domain/sportPrediction/entity'

const LiveMatch: FC<LiveMatchEntity> = (props) => {
    const { teamA, teamALogoUri, teamB, teamBLogoUri, teamAScore, teamBScore, status, statusShort} = props
    // const [secondsIntoMatch, setSecondsIntoMatch] = useState<number>()
    // const [formatedTime, setFormatedTime] = useState<string>()

    // useEffect(() => {

    //     const getTime = async () => {
    //         const timeIntoMatch = await getElapsedSeconds(startTimeStamp)
    //         setSecondsIntoMatch(timeIntoMatch)
            
    //     }
    //     getTime()
    //     if(!secondsIntoMatch) return;
    //   const countUp= setInterval(() => {
    //       if(secondsIntoMatch < 3600) {
    //           setFormatedTime(new Date(secondsIntoMatch * 1000).toISOString().substr(14, 5))
    //       }else {
    //         setFormatedTime(new Date(secondsIntoMatch as number * 1000).toISOString().substr(11, 8))
    //       }
    //     setSecondsIntoMatch(prev => prev as number + 1)
        
    //   }, 1000)

    //   return () => {
    //     clearInterval(countUp)
    //   }
    // }, [secondsIntoMatch, formatedTime, startTimeStamp])
    
    
  return (
    <div className='live__match__card'>
        <div className='live__match__card__head'>
            <div className={`status__badge ${["1H", "2H", "HT", "LIVE"].includes(statusShort) ?  "live__badge" : "pending__badge"}`}>
                <span>{["1H", "2H", "HT", "LIVE"].includes(statusShort) ? "LIVE" : "PENDING"}</span>
            </div>
            <span className='match__status'>
                {status}
            </span>
        </div>
        <div className='live__match__card__body'>
            <div className='logos__container'>
                <div className='team__one__logo__container'>
                    <img src = {teamALogoUri} alt = {`${teamA} logo`} />
                </div>
                <div className='team__two__logo__container'>
                    <img src = {teamBLogoUri} alt = {`${teamB} logo`} />
                </div>
            </div>
            <div className='team__scores'>
                <div className = 'team__one'>
                    <span className='name'>{teamA}</span>
                    <span className='score'>{teamAScore}</span>
                </div>
                <div className = 'team__two'>
                    <span className='name'>{teamB}</span>
                    <span className='score'>{teamBScore}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LiveMatch