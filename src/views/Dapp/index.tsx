import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Farming from './pages/farming';
import Staking from './pages/staking';
import Prediction from './pages/prediction';
import './appdashboard.styles.scss';
import { Provider } from 'react-redux';
import { store } from './models/infrastructure/redux/stores';

const AppDashboard: FC = () => {
	return (
		<Provider store={store}>
			<div className='app__dashboard'>
				<Routes>
					<Route path='/farming' element={<Farming />} />
					<Route path='/price-prediction/*' element={<Prediction />} />
					{['/', '/staking/*'].map((path, index) => {
						return <Route key={index} path={path} element={<Staking />} />;
					})}
				</Routes>
				<ToastContainer
					position="bottom-right"
					hideProgressBar={true}
					newestOnTop={false}
					closeButton={false}
					rtl={false}
					pauseOnFocusLoss
					/>
			</div>
		</Provider>
	);
};

export default AppDashboard;
