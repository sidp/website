import React, { Component, Fragment } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import MarkdownPage from '../components/markdown-page';
import PostDetails from '../components/post-details';
import { cubicBezierFadeIn } from '../styles/variables';

export default class BlogPost extends Component {
	render() {
		const {
			data: { markdownRemark: page },
		} = this.props;

		return (
			<StyledMarkdownPage
				page={page}
				role="main"
				render={({ title, body }) => (
					<Fragment>
						{title}
						{body}
						<PostDetails>
							Published on{' '}
							<time
								dateTime={page.frontmatter.timestamp}
								className="dt-published"
							>
								{page.frontmatter.date}
							</time>
						</PostDetails>
					</Fragment>
				)}
			/>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				excerpt
				date: published(formatString: "MMMM d, YYYY")
				timestamp: published
			}
			html
		}
	}
`;

const StyledMarkdownPage = styled(MarkdownPage)`
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;
`;
