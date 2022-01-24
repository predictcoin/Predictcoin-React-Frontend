import { useEffect } from 'react';
import Aos from 'aos';

import Header from './header';
import Hero from './hero';
import Footer from './footer';
import CTA from './cta';
import Partone from './partone';

import './Home.styles.scss';

function Home() {
	useEffect(() => {
		Aos.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false,
		});

		/**
		 * Easy on scroll event listener
		 */
		const onscroll = (el: HTMLElement | Document, listener: any) => {
			el.addEventListener('scroll', listener);
		};

		let selectHeader = document.querySelector('#header');
		if (selectHeader) {
			const headerScrolled = () => {
				if (window.scrollY > 100) {
					selectHeader!.classList.add('header-scrolled');
				} else {
					selectHeader!.classList.remove('header-scrolled');
				}
			};
			window.addEventListener('load', headerScrolled);
			onscroll(document, headerScrolled);
		}
	}, []);

	return (
		<div id='home'>
			<Header />
			<Hero />
			<main>
				<Partone />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}

export default Home;
