import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Blog extends Component {
	render() {
		const { data } = this.props;
		const blogPosts = data.allMarkdownRemark.edges.map(edge => edge.node);
		const { siteMetadata } = data.site;

		return (
			<div>
				<Helmet>
					<title>Blog</title>
				</Helmet>

				{blogPosts.map(post =>
					<div key={post.published}>
						{post.title}
					</div>
				)}
			</div>
		);
	}
}

export const pageQuery = graphql`
	query blogPageData {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(
			filter: { fields: { type: { eq: "blogPost" } } }
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					frontmatter {
						title
						published
					}
					html
				}
			}
		}
	}
`;
