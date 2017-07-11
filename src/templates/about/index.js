import React from 'react';

import { pageProps } from '../../components/prop-types';
import MarkdownPage from '../../components/markdown-page';

import styles from './about.module.css';

export default function About({ data: { markdownRemark: page } }) {
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
			/>
		</article>
	);
}

export const pageQuery = graphql`
	query AboutPageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
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
	}
`;
