import React, { PropTypes } from 'react';

import { pageProps } from '../prop-types';
import MarkdownPage from '../markdown-page';

import styles from './about.module.css';
import portrait1x from '../../images/peter-1x.jpg';
import portrait2x from '../../images/peter-2x.jpg';

const About = ({ page }) => (
	<article role="main" className={styles['about']}>
		<div className={styles['summary']}>
			<img
				src={portrait1x}
				sizes="(min-width: 500px) 50vw, 100vw"
				srcSet={`${portrait1x} 600w, ${portrait2x} 1200w`}
				alt="Peter Simonsson"
				className={styles['portrait']}
			/>
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