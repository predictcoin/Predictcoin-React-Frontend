import { FC, useEffect, useState } from "react"
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import Sidebar from '../../Components/Sidebar';
import SportPredictionMainContent from "./SportPredictionMainContent";
import "./sport_prediction.styles.scss";

const SportPrediction: FC = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
    const {initializeEventWatch} = useSportPredictionViewModel()

    useEffect(() => {
      initializeEventWatch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  return (
      <section id = "sport__prediction">
        <Sidebar 
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
        <SportPredictionMainContent 
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </section>
  )
}

export default SportPrediction