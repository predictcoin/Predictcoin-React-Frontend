import { FC, useState } from 'react';

import Logo from '../../../assets/img/logo.png';

const Header: FC = () => {
	const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

	return (
		<header id='header' className='fixed-top '>
			<div className='container d-flex align-items-center'>
				<a href='index.html' className='logo me-auto'>
					<img src={Logo} alt='' className='img-fluid' />
				</a>

				<nav
					id='navbar'
					className={`navbar ${navbarOpen ? 'navbar-mobile' : ''}`}
				>
					<ul>
						<li>
							<a className='nav-link scrollto active' href='#hero'>
								Home
							</a>
						</li>
						<li>
							<a
								className='nav-link'
								href='CroPredict_whitepaper.pdf'
								target='_blank'
							>
								Whitepaper
							</a>
						</li>
						<li>
							<a className='getstarted scrollto' href='/app/staking'>
								Launch DApp
							</a>
						</li>
					</ul>
					<i
						className={`bx bx-menu mobile-nav-toggle ${
							navbarOpen ? 'bx-x' : ''
						}`}
						onClick={() => setNavbarOpen((navbarOpen) => !navbarOpen)}
					></i>
				</nav>
			</div>
		</header>
	);
};

export default Header;
