import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import CustomModal from './index';
import MetamaskIcon from '../../../../assets/appSvgs/MetamaskIcon';
import TrustwalletIcon from '../../../../assets/pics/Trustwallet.png';
import SafepalIcon from '../../../../assets/pics/Safepal.png';

interface ModalConnectProps {
	closeModal: Dispatch<SetStateAction<boolean>>;
}

const ModalConnect: FC<ModalConnectProps> = ({ closeModal }) => {
	const closeModalFunc = (e: any) => {
		if (e.target?.id === 'custom__modal') closeModal(false);
	};

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
					</button>
				</div>
			</div>
		</CustomModal>
	);
};

export default ModalConnect;
