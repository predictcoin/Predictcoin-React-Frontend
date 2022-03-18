import { Dispatch, FC } from "react";
import WalletIcon from "../../../../assets/appSvgs/WalletIcon";
import PredictLogoSidebar from '../../../../assets/pics/PredictLogoSidebar.png';
import "./header.styles.scss";


interface HeaderProps {
  title: string,
  subtitle: string,
  setIsSidebarExpanded: Dispatch<React.SetStateAction<boolean>>
  isSidebarExpanded: boolean
  setModalOpened: Dispatch<React.SetStateAction<boolean>>
}
const Header: FC<HeaderProps> = ({subtitle, title, setIsSidebarExpanded, isSidebarExpanded, setModalOpened}) => {
  return (
    <header>
      <button
        className='hamburger'
        onClick={() =>
          setIsSidebarExpanded((isSidebarExpanded) => !isSidebarExpanded)
        }
      >
        <div id='nav-icon1' className={isSidebarExpanded ? 'open' : ''}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className='header__text'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className='header__ctas'>
        <div className='wallet__price'>
          <img src={PredictLogoSidebar} alt='predict-coin-logo' />
          <p>25.08 PRED</p>
        </div>
        {/* add 'not__connected class if wallet is not connected' */}
        <button className='address' onClick={() => setModalOpened(true)}>
          <WalletIcon />
          <span>0x5TD6...4567</span>
        </button>
      </div>
    </header>
  )
}

export default Header;