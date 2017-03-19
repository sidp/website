import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { config } from '../../config.toml';
import ExternalLink from '../external-link';
import utils from '../../css/utils.module.css';
import styles from './header.module.css';

const links = [
	{ label: 'Twitter', url: 'https://twitter.com/sidp' },
	{ label: 'GitHub', url: 'https://github.com/sidp' },
	{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/sidp86' },
	{ label: 'Instagram', url: 'https://www.instagram.com/sidp/' },
	{ label: 'Last.fm', url: 'http://www.last.fm/user/sidp' },
];

const navigation = config.navigation || [];

const Header = ({ intro = false, currentPath = '' }) => {
	let introElement = '';

	if (intro) {
		introElement = (
			<div className={styles['content-wrapper']}>
				<p>
					I’m a web designer and developer working in Stockholm, Sweden. This is a selection of the projects I’ve worked on in the recent years.
				</p>
				<p className={styles['links']}>
					{links.map(({ label, url }) => (
						<ExternalLink to={url} key={url}>
							{label}
						</ExternalLink>
					))}
				</p>
			</div>
		);
	}

	return (
		<header className={styles['header']} role="banner">
			<div className={utils['container']}>
				<div className={styles['header-wrapper']}>
					<h1 className={styles['title']}>
						<Link to={prefixLink('/')}>Peter Simonsson</Link>
					</h1>
					<nav className={styles['navigation']}>
						{navigation.map(item => (
							<NavItem
								path={item.path}
								selected={item.path === currentPath}
								key={item.path}
							>
								{item.label}
							</NavItem>
						))}
					</nav>
				</div>
				{introElement}
			</div>
		</header>
	);
}

Header.propTypes = {
	intro: PropTypes.bool,
	currentPath: PropTypes.string,
}

export default Header;

const NavItem = ({ path, selected, children }) => {
	const className = selected ? styles['selected'] : '';

	return (
		<Link
			to={prefixLink(path)}
			className={className}
		>
			{children}
		</Link>
	);
};
