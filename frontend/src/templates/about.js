import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import MarkdownPage from '../components/markdown-page';
import { fadeIn, cubicBezierFadeIn, imageBoxShadow } from '../styles/variables';
import Columns, { Column } from '../components/columns';

export default class About extends Component {
	render() {
		const {
			data: { markdownRemark: page },
		} = this.props;
		const image =
			page.frontmatter.portrait &&
			page.frontmatter.portrait.childImageSharp.image;

		return (
			<Columns as="article" role="main">
				<Column span={{ '<small': 12, '>small': 4, '>medium': 5 }}>
					{image && (
						<Portrait
							src={image.src}
							sizes={image.sizes}
							srcSet={image.srcSet}
							alt="Peter Simonsson"
						/>
					)}
				</Column>
				<Column span={{ '<small': 12, '>small': 8, '>medium': 7 }}>
					<Content page={page} htmlElement="div" />
				</Column>
			</Columns>
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
						image: fluid(maxWidth: 640) {
							...GatsbyImageSharpFluid
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

const Portrait = styled.img`
	max-width: 100%;
	width: 600px;
	height: auto;
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
	margin-bottom: 0;
	float: left;

	box-shadow: ${imageBoxShadow};
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
`;
