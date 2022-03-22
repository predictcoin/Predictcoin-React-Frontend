import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import PredictionIcon from '../../../../assets/pics/txprediction.svg';
import {useWalletViewModel} from "../../../application/controllers/walletViewModel";
import {ReactComponent as ExternalLink} from "../../../../assets/pics/external-link.svg";
import "./StakeModal.styles.scss";
import { displayDecimals } from '../../../lib/utils/number';
import { ethers, utils } from 'ethers';
import BigNumber from "bignumber.js"


interface ModalProps {
	closeModal: (open: boolean) => void;
	tokenName: string;
	balance: string
	value: string
	usdValue: string
	onChange: (_:any) => void
	confirm: () => void;
	type: string;
	decimals: number
}

export const StakeModal: FC<ModalProps> = (
		{ closeModal, tokenName, balance, value, usdValue, onChange, confirm, type, decimals }
	) => {
	const closeModalFunc = (e: any) => {
		if (e.target?.id === 'custom__modal') closeModal(false);
	};

	const {disconnect, address, active} = useWalletViewModel();

	const setMax = () => {
		onChange({target: {value: ethers.utils.formatUnits(balance, decimals)}})
	}
	

	useEffect(() => {
		window.addEventListener('click', (e) => closeModalFunc(e));

		return () => {
			window.removeEventListener('click', (e) => closeModalFunc(e));
		};
	}, []);

	return (
		<section id='custom__modal'>
			<div className='custom__modal__content'>
				<h4>{type} {tokenName} tokens</h4>
				<div className="input">
					<div className="desc">
						<span>Stake</span>
						<span>{`${type === "Stake" ? "Balance" : "Staked"}`}</span>
					</div>
					<p className="balance">
						{utils.formatUnits(balance, decimals)}
					</p>
					<div className="inputbox">
						<div>
							<input 
								value={value}
								onChange={onChange}
								autoFocus
							/>
							<p className="usd">${usdValue === "NaN" ? "0" : displayDecimals(usdValue, 2)}</p>
						</div>
						<button className="max" onClick={setMax}>
							MAX
						</button>
					</div>
					
        </div>
				<div className="buttons">
					<button onClick={() => closeModal(false)} className="cancel">Cancel</button>
					&nbsp;&nbsp;
					<button onClick={confirm} className={`confirm ${!new BigNumber(value).isZero() && new BigNumber(utils.formatUnits(balance, decimals)).gte(value) && "active"}`}>Confirm</button>
				</div>
			</div>
		</section>
	);
};

