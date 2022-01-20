import Home from './views/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppDashboard from './views/Dapp';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/app/*' element={<AppDashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
