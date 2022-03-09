import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import CustomModal from './index';
import MetamaskIcon from '../../../../assets/appSvgs/MetamaskIcon';
import WalletConnectIcon from '../../../../assets/appSvgs/WalletConnect';
import TrustwalletIcon from '../../../../assets/pics/Trustwallet.png';
import SafepalIcon from '../../../../assets/pics/Safepal.png';
import {useWalletViewModel} from "../../application/controllers/walletViewModel";
import {useWalletStore} from "../../models/infrastructure/redux/stores/wallet";

interface ModalConnectProps {
	closeModal: Dispatch<SetStateAction<boolean>>;
}

const ModalConnect: FC<ModalConnectProps> = ({ closeModal }) => {
	const closeModalFunc = (e: any) => {
		if (e.target?.id === 'custom__modal') closeModal(false);
	};

	const {connect} = useWalletViewModel();

	useEffect(() => {
		window.addEventListener('click', (e) => closeModalFunc(e));

		return () => {
			window.removeEventListener('click', (e) => closeModalFunc(e));
		};
	}, []);

	return (
		<CustomModal>
			<div className='modal__connect'>
				<h1 className='title'>Connect Wallet</h1>
				<p className='sub__title'>Connect crypto wallet of your choice</p>

				<div className='wallet__options'>
					<button className='wallet' onClick={() => connect("metamask")}>
						<MetamaskIcon />
						<p className='wallet__name'>Metamask</p>
					</button>
					<button className='wallet' onClick={() => connect("walletconnect")}>
						<WalletConnectIcon />
						<p className='wallet__name'>WalletConnect</p>
					</button>
					{/* <button className='wallet'>
						<img src={SafepalIcon} alt='safepalicon' />
						<p className='wallet__name'>Safepal</p>
					</button>
					<button className='wallet'>
						<MetamaskIcon />
						<p className='wallet__name'>Metamask</p>
					</button>
					<button className='wallet'>
						<img src={TrustwalletIcon} alt='trustwalleticon' />
						<p className='wallet__name'>Trustwallet</p>
					</button>
					<button className='wallet'>
						<img src={SafepalIcon} alt='safepalicon' />
						<p className='wallet__name'>Safepal</p>
					</button> */}
				</div>
			</div>
		</CustomModal>
	);
};

export default ModalConnect;
