import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import { siteMetadata } from '../../../gatsby-config';
import ExternalLink from '../external-link';
import utils from '../../css/utils.module.css';
import styles from './header.module.css';

const navigation = siteMetadata.navigation || [];

const Header = ({ currentPath = '' }) =>
	<header className={styles['header']} role="banner">
		<div className={utils['container']}>
			<div className={styles['header-wrapper']}>
				<h1 className={styles['title']}>
					<Link to={'/'}>Peter Simonsson</Link>
				</h1>
				<nav className={styles['navigation']}>
					{navigation.map(item =>
						<NavItem
							path={item.path}
							selected={item.path === currentPath}
							key={item.path}
						>
							{item.label}
						</NavItem>
					)}
				</nav>
			</div>
		</div>
	</header>;

Header.propTypes = {
	currentPath: PropTypes.string,
};

export default Header;

const NavItem = ({ path, selected, children }) => {
	const className = selected ? styles['selected'] : '';

	return (
		<Link to={path} className={className}>
			{children}
		</Link>
	);
};
