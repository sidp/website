import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import BlogList from '../components/blog-list';
import { TextWrapper } from '../styles/components';

export default class Blog extends Component {
	render() {
		const { data } = this.props;
		const blogPosts = data.allMarkdownRemark.edges.map(edge => edge.node);

		return (
			<div>
				<Helmet>
					<title>Blog</title>
				</Helmet>
				<TextWrapper>
					<BlogList posts={blogPosts} />
				</TextWrapper>
			</div>
		);
	}
}

export const pageQuery = graphql`
	query blogPageData {
		allMarkdownRemark(
			filter: { fields: { type: { eq: "blogPost" } } }
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					...Blog_item
				}
			}
		}
	}
`;
