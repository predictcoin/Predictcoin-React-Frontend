import { FC } from 'react';
import { Link } from 'react-router-dom';

import HeroImage from '../../../assets/img/hero-img.png';

const Hero: FC = () => {
	return (
		<section id='hero' className='d-flex align-items-center'>
			<div className='container'>
				<div className='row'>
					<div
						className='col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1'
						data-aos='fade-up'
						data-aos-delay='200'
					>
						<h1>
							Predict crypto-assets, sports games and have fun in the arena.
						</h1>{' '}
						<br />
						<div className='d-flex flex-wrap justify-content-center justify-content-lg-start button-bb'>
							<Link to='/app/staking' className='btn-get-started'>
								Launch DApp
							</Link>
							<span></span>
							<a
								href='CroPredict_whitepaper.pdf'
								target='_blank'
								className='btn-get-started2'
							>
								Whitepaper
							</a>
						</div>
					</div>
					<div
						className='col-lg-6 order-1 order-lg-2 hero-img'
						data-aos='zoom-in'
						data-aos-delay='200'
					>
						<img src={HeroImage} className='img-fluid animated' alt='' />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
