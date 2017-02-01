import React, { PropTypes } from 'react';

import { rhythm } from '../../utils/typography';
import utils from '../../css/utils.module';
import styles from './footer.module.css';

const Footer = (props) => {
	return (
		<footer className={styles['footer']}>
			<div className={utils['container']}>
				<p>Ps</p>
			</div>
		</footer>
	);
}

export default Footer;
