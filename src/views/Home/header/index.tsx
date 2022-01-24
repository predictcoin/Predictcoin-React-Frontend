import { FC } from 'react';

import Logo from '../../../assets/img/logo.png';

const Header: FC = () => {
	return (
		<header id='header' className='fixed-top '>
			<div className='container d-flex align-items-center'>
				<a href='index.html' className='logo me-auto'>
					<img src={Logo} alt='' className='img-fluid' />
				</a>

				<nav id='navbar' className='navbar'>
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
							<a className='getstarted scrollto' href='#cta'>
								Launch DApp
							</a>
						</li>
					</ul>
					<i className='bi bi-list mobile-nav-toggle'></i>
				</nav>
			</div>
		</header>
	);
};

export default Header;
