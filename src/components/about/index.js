import React from 'react';

import { pageProps } from '../prop-types';
import MarkdownPage from '../markdown-page';

import styles from './about.module.css';
import portrait1x from '../../pages/images/peter.jpg';
import portrait2x from '../../pages/images/peter.jpg';

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

export default About;

export const aboutFragment = graphql`
	fragment AboutPage_details on MarkdownRemark {
		frontmatter {
			title
			heading
			description
		}
		html
	}
`;
