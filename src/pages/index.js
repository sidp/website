import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
import Columns, { Column } from '../components/columns';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import PostsList from '../components/posts-list';
import { InnerContainer } from '../styles/components';

export default class Index extends Component {
	render() {
		const { data } = this.props;
		const projects = data.allProjects.edges.map(edge => edge.node);
		const posts = data.allPosts.edges.map(edge => edge.node);
		const updates = data.allUpdates.edges.map(edge => edge.node);
		const { siteMetadata } = data.site;

		return (
			<>
				<Helmet>
					<meta name="description" content={siteMetadata.description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
				</Helmet>
				<Intro />
				<InnerContainer>
					<Columns>
						<Column span={{ '<medium': 12, '>medium': 8 }}>
							<PostsList posts={posts} />
						</Column>
						<Column span={{ '<medium': 12, '>medium': 4 }}>
							{updates.map(update => (
								<div key={update.fields.slug}>
									<div dangerouslySetInnerHTML={{ __html: update.html }} />
									<Link to={update.fields.slug}>{update.frontmatter.date}</Link>
								</div>
							))}
						</Column>
					</Columns>
				</InnerContainer>
				<ProjectList title="Projects" projects={projects} />
			</>
		);
	}
}

export const pageQuery = graphql`
	query indexPageData {
		site {
			siteMetadata {
				title
				description
			}
		}

		allProjects: allMarkdownRemark(
			filter: { fields: { type: { eq: "project" } } }
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}

		allPosts: allMarkdownRemark(
			filter: { fields: { type: { eq: "post" } } }
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					...PostList_item
				}
			}
		}

		allUpdates: allMarkdownRemark(
			filter: { fields: { type: { eq: "update" } } }
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					id
					frontmatter {
						title
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
