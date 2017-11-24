import React, { Component } from 'react';

import { pageProps } from '../components/prop-types';
import MarkdownPage from '../components/markdown-page';
import Meta from '../components/meta';

export default class BlogPost extends Component {
	render() {
		const { data: { markdownRemark: page } } = this.props;

		return (
			<MarkdownPage page={page} role="main">
				<time dateTime={page.frontmatter.timestamp}>
					<Meta published={page.frontmatter.date} />
				</time>
			</MarkdownPage>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				description
				date: published(formatString: "MMMM d, YYYY")
				timestamp: published
			}
			html
		}
	}
`;
