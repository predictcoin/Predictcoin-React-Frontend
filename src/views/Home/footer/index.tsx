import { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer id='footer'>
			<div className='footer-top'>
				<div className='container socials'>
					<div className='social-links mt-3'>
						<a
							href='https://twitter.com/CROPredict'
							className='twitter'
							target='_blank'
							rel='noreferrer'
						>
							<i className='bx bxl-twitter'></i>
						</a>
						<a
							href='https://t.me/CROPredict'
							className='telegram'
							target='_blank'
							rel='noreferrer'
						>
							<i className='bx bxl-telegram'></i>
						</a>
						<a
							href='https://cropredict.medium.com/'
							className='medium'
							target='_blank'
							rel='noreferrer'
						>
							<i className='bx bxl-medium'></i>
						</a>
					</div>
				</div>{' '}
				<br />
				<p className='copyright'>
					{' '}
					&copy; Copyright{' '}
					<strong>
						<span>CRO Predict</span>
					</strong>
					. All Rights Reserved{' '}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
