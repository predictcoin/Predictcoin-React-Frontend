import { useState } from "react";
import WalletIcon from "../../../../assets/appSvgs/WalletIcon";
import {ReactComponent as ColdImage} from "../../../../assets/pics/cold.svg";
import ModalConnect from "../CustomModal/ModalConnect";
import "./styles.scss";

const Cold = ({text, button}: {text?: string, button?: boolean} ) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)

  const modal = <ModalConnect closeModal={() => setModalOpened(false)} />

  return  <div className="cold">
            {modalOpened && modal}
            
            <ColdImage className="image"/>
            <br></br>
            <span className="heading">It's so cold here</span>

            <span className="info">{text}</span>
            {button && <button className={`address not__connected`} onClick={() => setModalOpened(true)}>
              <WalletIcon /> &nbsp;&nbsp;
              <span>connect wallet</span>
            </button>}
          </div>
}

export default Cold;