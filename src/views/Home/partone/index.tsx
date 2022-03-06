import { FC } from 'react';

import SkillsImage from '../../../assets/img/skills.png';
import PredictEarnImage from '../../../assets/img/icon1.png';
import CrossPlatformImage from '../../../assets/img/icon2.png';
import SecureServerImage from '../../../assets/img/icon3.png';
import VeryFastImage from '../../../assets/img/icon4.png';

const Partone: FC = () => {
	return (
		<section id='partone' className='partone gradbg'>
			<div className='container' data-aos='fade-up'>
				<div className='row'>
					<div
						className='col-lg-6 d-flex align-items-center'
						data-aos='fade-right'
						data-aos-delay='100'
					>
						<img src={SkillsImage} className='img-fluid' alt='' />
					</div>
					<div
						className='col-lg-6 pt-4 pt-lg-0 content'
						data-aos='fade-left'
						data-aos-delay='100'
					>
						<h5>About CRO Predict</h5>
						<h3>The First Predict-To-Earn GameFi on Cronos Chain</h3>
						<p className='parag'>
							it's a play-to-earn (predict-to-earn) GameFi. Users will be able
							to predict various cryptos and earn CRP rewards after winning.
							Predict crypto prices, sports games and gain experience in the
							arena, as well as earning rewards while at it.
						</p>
					</div>
				</div>

				{/* <div className='row'>
					<div
						className='col-lg-6 pt-4 pt-lg-0 content'
						data-aos='fade-left'
						data-aos-delay='100'
					>
						<h5>Prediction GameFi</h5>
						<h3>
							Every week users can predict on 5 different coins on CRO Predict
							using CRP.{' '}
						</h3>
						<p className='parag'>
							Each coin has only 10 seats to accept predictions and each
							prediction costs 10 CRP, you can only predict once from one
							wallet. (This means only 50 seats available in total per week and
							500 CRP retrieved). Those who try to predict after seats are
							filled will be unsuccessful and have to try again next week.
						</p>
					</div>

					<div
						className='col-lg-6 d-flex align-items-center'
						data-aos='fade-right'
						data-aos-delay='100'
					>
						<img src='assets/img/part2.png' className='img-fluid' alt='' />
					</div>
				</div> */}

				<div className='mid-row content'>
					<h5 className=''>Why Use CRO Predict</h5>
					<h3>Our Features</h3>
					<p>
						Earn weekly rewards while predicting crypto-assets price and sports
						games.
					</p>

					<div className='container topspace'>
						<div className='row'>
							<div className='col'>
								<img src={PredictEarnImage} className='img-fluid' alt='' />
								<p></p>
								<p> Predict & Earn</p>
							</div>
							<div className='col'>
								<img src={CrossPlatformImage} className='img-fluid' alt='' />
								<p></p>
								<p>Cross-Platfom Predicting</p>
							</div>
							<div className='col'>
								<img src={SecureServerImage} className='img-fluid' alt='' />
								<p></p>
								<p>Secure Server</p>
							</div>
							<div className='col'>
								<img src={VeryFastImage} className='img-fluid' alt='' />
								<p></p>
								<p>Very Fast</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Partone;
