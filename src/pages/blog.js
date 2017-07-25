import React, { Component } from 'react';
import Link from 'gatsby-link';
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
				<p>
					There are {blogPosts.length} blog post(s):
				</p>
				{blogPosts.map(post =>
					<div>
						<h2>
							{post.frontmatter.title}
						</h2>
						{post.frontmatter.description}
						<Link to={post.fields.slug}>Read more</Link>
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
					fields {
						slug
					}
					html
				}
			}
		}
	}
`;
