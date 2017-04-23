import React from 'react';

import { rhythm } from '../../utils/typography';
import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './footer.module.css';

const Footer = () => (
	<footer className={styles['footer']}>
		<div className={utils['container']}>
			<span className={styles['item']}>
				Peter Simonsson
			</span>
			<span className={styles['item']}>
				Contact me on <a href="mailto:peter@simonsson.com">peter@simonsson.com</a>
			</span>
			<span className={styles['item']}>
				This site on <ExternalLink to="https://github.com/sidp/portfolio">GitHub</ExternalLink>
			</span>
		</div>
	</footer>
);

export default Footer;
