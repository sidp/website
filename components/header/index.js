import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { config } from '../../config.toml';
import ExternalLink from '../external-link';
import utils from '../../css/utils.module.css';
import styles from './header.module.css';

const navigation = config.navigation || [];

const Header = ({ intro = false, currentPath = '' }) => {
	let introElement = '';

	if (intro) {
		introElement = (
			<div className={styles['content-wrapper']}>
				<p>
					Hi! I'm the Technical Director of the PR agency <ExternalLink to="http://wenderfalck.com/">Wenderfalck</ExternalLink> in Stockholm, Sweden. This is a selection of the most popular projects I've worked on. Have a look!
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
};

Header.propTypes = {
	intro: PropTypes.bool,
	currentPath: PropTypes.string,
};

export default Header;

const NavItem = ({ path, selected, children }) => {
	const className = selected ? styles['selected'] : '';

	return (
		<Link to={prefixLink(path)} className={className}>
			{children}
		</Link>
	);
};
