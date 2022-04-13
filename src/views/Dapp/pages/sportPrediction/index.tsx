import { FC, useState } from "react"
import Sidebar from '../../Components/Sidebar';
import SportPredictionMainContent from "./SportPredictionMainContent";
import "./sport_prediction.styles.scss";

const SportPrediction: FC = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
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