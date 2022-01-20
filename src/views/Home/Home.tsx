import './Home.css';

import Header from './header';
import About from './about';
import Footer from './footer';
import Market from './market';
import RoadMap from './roadmap';
import Navbar from './navbar';
import WhitePaper from './whitepaper';
import Partner from './partner';
import FAQ from './FAQ';

function Home() {
	return (
		<div className='App'>
			<Navbar />
			<Header />
			<Market />
			<div className='gradient__bg'>
				<About />
				<WhitePaper />
				<RoadMap />
			</div>
			<Partner />
			<FAQ />
			<Footer />
		</div>
	);
}

export default Home;
