import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Farming from './pages/farming';
import Staking from './pages/staking';
import Prediction from './pages/prediction';
import './appdashboard.styles.scss';

const AppDashboard: FC = () => {
	return (
		<div className='app__dashboard'>
			<Routes>
				<Route path='/farming' element={<Farming />} />
				<Route path='/price-prediction/*' element={<Prediction />} />
				{['/', '/staking/*'].map((path, index) => {
					return <Route key={index} path={path} element={<Staking />} />;
				})}
			</Routes>
		</div>
	);
};

export default AppDashboard;
