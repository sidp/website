import React from 'react';

import { pageProps } from '../prop-types';
import MarkdownPage from '../markdown-page';

import styles from './about.module.css';

const About = ({ page }) => {
	const image =
		page.frontmatter.portrait &&
		page.frontmatter.portrait.childImageSharp.image;
	return (
		<article role="main" className={styles['about']}>
			<div className={styles['summary']}>
				{image &&
					<img
						src={image.src}
						sizes={image.sizes}
						srcSet={image.srcSet}
						alt="Peter Simonsson"
						className={styles['portrait']}
					/>}
			</div>
			<MarkdownPage
				page={page}
				className={styles['content']}
				htmlElement="div"
				role=""
			/>
		</article>
	);
};

export default About;

export const aboutFragment = graphql`
	fragment AboutPage_details on MarkdownRemark {
		frontmatter {
			title
			heading
			description
			portrait {
				childImageSharp {
					image: responsiveSizes(maxWidth: 640) {
						src
						srcSet
					}
				}
			}
		}
		html
	}
`;
