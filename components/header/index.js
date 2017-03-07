import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

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

const Header = (props) => {
	let descriptionElement = '';
	let linksElement = '';

	if (!props.slim) {
		descriptionElement = (
			<p>
				I’m a web designer and developer working in Stockholm, Sweden. This is a
				selection of the projects I’ve worked on in the recent years.
			</p>
		);
		linksElement = (
			<p className={styles['links']}>
				{links.map(({ label, url }) => (
					<ExternalLink to={url} key={url}>
						{label}
					</ExternalLink>
				))}
			</p>
		);
	}

	let classNames = styles['header'];

	if (props.slim) {
		classNames += ` ${styles['header-slim']}`;
	}

	return (
		<header className={classNames} role="banner">
			<div className={utils['container']}>
				<div className={styles['content-wrapper']}>
					<h1 className={styles['title']}>
						<Link to={prefixLink('/')}>Peter Simonsson</Link>
					</h1>
					{descriptionElement}
					{linksElement}
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	slim: PropTypes.bool,
}

Header.defaultProps = {
	slim: false,
}

export default Header;
