import React, { PropTypes } from 'react';

import { pageProps } from '../prop-types';
import MarkdownPage from '../markdown-page';

import styles from './about.module.css';
import portrait from '../../images/peter.jpg';

const About = ({ page }) => (
	<article role="main" className={styles['about']}>
		<div className={styles['summary']}>
			<img src={portrait} alt="Peter Simonsson" className={styles['portrait']} />
		</div>
		<MarkdownPage
			page={page}
			className={styles['content']}
			htmlElement="div"
			role=""
		/>
	</article>
);

About.propTypes = {
	page: pageProps,
};

export default About;
