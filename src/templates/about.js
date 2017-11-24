import React, { Component } from 'react';
import styled from 'styled-components';

import { pageProps } from '../components/prop-types';
import MarkdownPage from '../components/markdown-page';

import { fadeIn, cubicBezierFadeIn } from '../styles/variables';

export default class About extends Component {
	render() {
		const { data: { markdownRemark: page } } = this.props;
		const image =
			page.frontmatter.portrait &&
			page.frontmatter.portrait.childImageSharp.image;

		return (
			<Article role="main">
				<Summary>
					{image && (
						<Portrait
							src={image.src}
							sizes={image.sizes}
							srcSet={image.srcSet}
							alt="Peter Simonsson"
						/>
					)}
				</Summary>
				<Content page={page} htmlElement="div" />
			</Article>
		);
	}
}

/**
 * GraphQL
 */

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

/**
 * Styled components
 */

const columnBreakPoint = '500px';

const Article = styled.article`
	@media (min-width: ${columnBreakPoint}) {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
`;

const Portrait = styled.img`
	max-width: 100%;
	width: 600px;
	height: auto;
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
`;

const Summary = styled.div`
	@media (min-width: ${columnBreakPoint}) {
		width: ${columnBreakPoint};
	}
`;

/**
 * todo: this approach leads to specificity conflict, hence the && hack.
 * A simpler solution here would be prefered.
 */
const Content = styled(MarkdownPage)`
	&& {
		margin-top: 0;
	}
	animation: fadeIn 400ms 100ms ${cubicBezierFadeIn} both;

	@media (min-width: ${columnBreakPoint}) {
		&& {
			margin-left: 1.2rem;
			margin-right: 0;
		}
		transition: margin-left 100ms ${cubicBezierFadeIn};
	}

	@media (min-width: 639px) {
		&& {
			margin-left: 1.8rem;
		}
	}
`;
