import { FC } from 'react';

// import ConnectModalIcon from '../../../../assets/appSvgs/ConnectModal';
import ConnectModalIcon from '../../../../assets/appSvgs/Icon Illustrations.png';
import './custommodal.styles.scss';

const CustomModal: FC = ({ children }) => {
	return (
		<section id='custom__modal'>
			<div className='custom__modal__content'>
				<div className='background'>
					<img src={ConnectModalIcon} alt="connect-modal" />
				</div>
				{children}
			</div>
		</section>
	);
};

export default CustomModal;
