import { FC, useState } from 'react';

import Sidebar from '../../Components/Sidebar';
import PricePredictionMainContent from './PricePredictionMainContent';
import './prediction.styles.scss';

const Prediction: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='prediction'>
			<Sidebar
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
			<PricePredictionMainContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default Prediction;
