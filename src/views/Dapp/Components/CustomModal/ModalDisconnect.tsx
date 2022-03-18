import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import MetamaskIcon from '../../../../assets/appSvgs/MetamaskIcon';
import {useWalletViewModel} from "../../application/controllers/walletViewModel";
import { shortenAddress } from '../../lib/utils/address';

import CustomModal from './index';

interface ModalDisconnectProps {
	closeModal: Dispatch<SetStateAction<boolean>>;
	CRPBalance: string;
}

const ModalDisconnect: FC<ModalDisconnectProps> = ({ closeModal, CRPBalance }) => {
	const closeModalFunc = (e: any) => {
		if (e.target?.id === 'custom__modal') closeModal(false);
	};

	const {disconnect, address, active} = useWalletViewModel();

	

	useEffect(() => {
		window.addEventListener('click', (e) => closeModalFunc(e));

		return () => {
			window.removeEventListener('click', (e) => closeModalFunc(e));
		};
	}, []);

	return (
		<CustomModal>
			<div className='modal__disconnect'>
				<h1 className='title'>Wallet Connected</h1>
				<p className='sub__title'>Connect crypto wallet of your choice</p>

				<button className='wallet__address'>
					<MetamaskIcon />
					<p>{shortenAddress(address)}</p>
				</button>

				<p className='account__balance'>{active ? CRPBalance : 0} CRP</p>
				<p className='account__balance__text'>Wallet balance</p>

				<button className='buy__pred'>BUY CRP</button>

				<button
					className='disconnect__wallet'
					onClick={() => {disconnect(); closeModal(false)}}
				>
					<p>Disconnect Wallet</p>
				</button>
			</div>
		</CustomModal>
	);
};

export default ModalDisconnect;
