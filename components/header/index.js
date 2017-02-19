import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './header.module.css';

const Header = (props) => {
	let description = '';
	let socialMedia = '';

	if (!props.slim) {
		description = (
			<p>
				I’m a web designer and developer working in Stockholm, Sweden. This is a
				selection of the projects I’ve worked on in the recent years.
			</p>
		);
		socialMedia = (
			<p className={styles['social-media']}>
				<ExternalLink to="https://twitter.com/sidp">Twitter</ExternalLink>
				<ExternalLink to="https://github.com/sidp">GitHub</ExternalLink>
				<ExternalLink to="https://www.linkedin.com/in/sidp86">LinkedIn</ExternalLink>
				<ExternalLink to="https://dribbble.com/sidp">Dribbble</ExternalLink>
				<ExternalLink to="http://www.last.fm/user/sidp">Last.fm</ExternalLink>
			</p>
		);
	}

	let classNames = styles['header'];

	if (props.slim) {
		classNames += ` ${styles['header-slim']}`;
	}

	return (
		<header className={classNames}>
			<div className={utils['container']}>
				<div className={utils['text-wrapper']}>
					<h1 className={styles['title']}>
						<Link to={prefixLink('/')}>Peter Simonsson</Link>
					</h1>
					{description}
					{socialMedia}
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
