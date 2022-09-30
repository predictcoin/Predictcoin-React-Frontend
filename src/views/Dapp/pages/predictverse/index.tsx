import { FC, useState } from 'react';

import Sidebar from '../../Components/Sidebar';
import PredictverseMainContent from './PredictverseMainContent';
import './predictverse.styles.scss';

const Predictverse: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='predictverse'>
			<Sidebar
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
			<PredictverseMainContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default Predictverse;
