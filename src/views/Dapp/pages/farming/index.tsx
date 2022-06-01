import { FC, useState } from 'react';

import Sidebar from '../../Components/Sidebar';
import FarmingMainContent from './FarmingMainContent';
import './farming.styles.scss';

const Farming: FC = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<section id='farming'>
			<Sidebar
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
			<FarmingMainContent
				isSidebarExpanded={isSidebarExpanded}
				setIsSidebarExpanded={setIsSidebarExpanded}
			/>
		</section>
	);
};

export default Farming;
