import React, { PropTypes } from 'react';

import { rhythm } from '../../utils/typography';
import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './footer.module.css';

const Footer = (props) => {
	return (
		<footer className={styles['footer']}>
			<div className={utils['container']}>
				<span className={styles['item']}>
					Peter Simonsson
				</span>
				<span className={styles['item']}>
					Contact me on <a href="mailto:peter@simonsson.com">peter@simonsson.com</a>
				</span>
				<span className={styles['item']}>
					Source for this site on <ExternalLink href="https://github.com/sidp/portfolio" className={styles['item']}>GitHub</ExternalLink>
				</span>
			</div>
		</footer>
	);
}

export default Footer;
