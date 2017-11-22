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
					There are {blogPosts.length} blog{' '}
					{blogPosts.length === 1 ? 'post' : 'posts'}:
				</p>
				{blogPosts.map(post => (
					<div key={post.fields.slug}>
						<hr />
						<time dateTime={post.frontmatter.timestamp}>
							{post.frontmatter.date}
						</time>
						<h2>{post.frontmatter.title}</h2>
						<p>
							{post.frontmatter.description}{' '}
							<Link to={post.fields.slug}>Read more »</Link>
						</p>
					</div>
				))}
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
						description
						date: published(formatString: "MMMM d, YYYY")
						timestamp: published
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
