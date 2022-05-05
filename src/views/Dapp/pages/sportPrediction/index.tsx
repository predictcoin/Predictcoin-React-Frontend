import { FC, useEffect, useState } from "react"
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import Sidebar from '../../Components/Sidebar';
import SportPredictionMainContent from "./SportPredictionMainContent";
import "./sport_prediction.styles.scss";

const SportPrediction: FC = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
    const {initializeEventWatch} = useSportPredictionViewModel()
    const {address} = useWalletViewModel()

    useEffect(() => {
      const sportOracleContract =  initializeEventWatch()
      return () => {
        sportOracleContract.removeAllListeners();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])
    
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