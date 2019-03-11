import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

export default class Index extends Component {
	render() {
		const { allProjects, site } = this.props.data;
		const projects = allProjects.edges.map(edge => edge.node);
		const { description, introText } = site.siteMetadata;

		return (
			<>
				<Helmet>
					<meta name="description" content={description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
				</Helmet>
				<Intro>
					<p dangerouslySetInnerHTML={{ __html: introText }} />
				</Intro>
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
				introText
			}
		}

		allProjects: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "project" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}

		allUpdates: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "update" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					id
					frontmatter {
						title
						date: published(formatString: "MMMM D, YYYY")
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
