import React from 'react';

import { rhythm } from '../../utils/typography';
import naturalJoin from '../../utils/natural-join';
import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './footer.module.css';

const Footer = () => {
	let links = [
		{
			label: 'Twitter',
			title: '@sidp on Twitter',
			url: 'https://twitter.com/sidp',
		},
		{
			label: 'GitHub',
			title: '@sidp on GitHub',
			url: 'https://github.com/sidp',
		},
		{
			label: 'LinkedIn',
			title: 'Peter Simonsson on LinkedIn',
			url: 'https://www.linkedin.com/in/sidp86',
		},
		{
			label: 'Instagram',
			title: '@sidp on Instagram',
			url: 'https://www.instagram.com/sidp/',
		},
		{
			label: 'Last.fm',
			title: 'sidp on Last.fm',
			url: 'http://www.last.fm/user/sidp',
		},
	].map(link => (
		<ExternalLink to={link.url} title={link.title} key={link.url}>
			{link.label}
		</ExternalLink>
	));

	return (
		<footer className={styles['footer']}>
			<div className={utils['container']}>
				<span className={`${styles['item']} ${styles['item--main']}`}>
					Peter Simonsson
				</span>
				<span className={styles['item']}>
					Contact me on
					{' '}
					<a href="mailto:peter@simonsson.com">peter@simonsson.com</a>.
				</span>
				<span className={styles['item']}>
					Also on {naturalJoin(links)}.
				</span>
				<span className={styles['item']}>
					Check out this site on
					{' '}
					<ExternalLink to="https://github.com/sidp/portfolio">
						GitHub
					</ExternalLink>.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
