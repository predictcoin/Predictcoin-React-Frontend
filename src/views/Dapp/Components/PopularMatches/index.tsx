import { FC } from 'react'
import './popular_matches.styles.scss'
import popularMatchesData from "../../data/popularMatchesData"
import PopularMatch from './PopularMatch'

interface PopularMatchesProps {
  openMatchPredictionModal: () => void
}

const PopularMatches: FC<PopularMatchesProps> = ({openMatchPredictionModal}) => {
  return (
    <section id = "popular__matches">
        <h2 className = "heading">POPULAR MATCHES</h2>
        {popularMatchesData.map(match => <PopularMatch key={match.id} {...match} openMatchPredictionModal = {openMatchPredictionModal} />)}
    </section>
  )
}

export default PopularMatches