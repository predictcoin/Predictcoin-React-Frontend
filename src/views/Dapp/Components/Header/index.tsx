import { ethers } from "ethers";
import { Dispatch, FC, useState } from "react";
import WalletIcon from "../../../../assets/appSvgs/WalletIcon";
import CRPLogoSidebar from '../../../../assets/pics/CRP.png';
import notificationIcon from "../../../../assets/pics/notification-bing.svg"
import { useWalletViewModel } from "../../application/controllers/walletViewModel";
import { TOKENS } from "../../constants/addresses";
import useToken from "../../hooks/useToken";
import { shortenAddress } from "../../lib/utils/address";
import { getChainId } from "../../lib/utils/chain";
import { displayDecimals } from "../../lib/utils/number";
import TxModal from "../CustomModal/TransactionModal";
import "./header.styles.scss";


interface HeaderProps {
  title: string,
  subtitle: string,
  setIsSidebarExpanded: Dispatch<React.SetStateAction<boolean>>
  isSidebarExpanded: boolean
  setModalOpened: Dispatch<React.SetStateAction<boolean>>
}
const Header: FC<HeaderProps> = ({subtitle, title, setIsSidebarExpanded, isSidebarExpanded, setModalOpened}) => {
  const {balance, decimals} = useToken(TOKENS[getChainId()].CRP)
  const {address, active} = useWalletViewModel();
  const [openTxs, setOpenTxs] = useState(false);

  return (
    <header>
      {openTxs && <TxModal closeModal={setOpenTxs}/>}
      <div className="top-header">
        <button
          className='hamburger'
          onClick={() =>
            setIsSidebarExpanded((isSidebarExpanded) => !isSidebarExpanded)
          }
        >
          <div id='nav-icon1' className={!isSidebarExpanded ? 'open' : ''}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className='header__text header__text--1'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className='header__ctas'>
          {
            active && 
            <div className='wallet__price'>
              <img src={CRPLogoSidebar} alt='predict-coin-logo' />
              <p>{displayDecimals(ethers.utils.formatUnits(balance, decimals), 5)}</p>
            </div>
          } 
          &nbsp; &nbsp;
          {/* add 'not__connected class if wallet is not connected' */}
          <button className={`address ${active || "not__connected"}`} onClick={() => setModalOpened(true)}>
              <WalletIcon />
            <span>{active ? shortenAddress(address || ""): "connect wallet"}</span>
          </button>
          &nbsp; &nbsp;
          {
            active && 
            <button 
              className="notification"
              onClick={() => setOpenTxs(!openTxs)}
              >
              <img src={notificationIcon} alt="alerts"/>
              &nbsp;
              <span>3</span>
            </button>
          }
        </div>
      </div>
        <div className='header__text header__text--2'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      
    </header>
  )
}

export default Header;