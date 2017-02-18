import React, { PropTypes } from 'react';

import { rhythm } from '../../utils/typography';
import utils from '../../css/utils.module';
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
					Source for this site on <a className={styles['item']} href="https://github.com/sidp/portfolio" target="_blank">GitHub</a>
				</span>
			</div>
		</footer>
	);
}

export default Footer;
