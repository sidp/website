import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

export default class Index extends Component {
	render() {
		const { allProjects, site } = this.props.data;
		const projects = allProjects.edges.map((edge) => edge.node);
		const { description, siteUrl } = site.siteMetadata;

		return (
			<>
				<Helmet>
					<meta name="description" content={description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
					<link rel="canonical" href={`${siteUrl}`} />
				</Helmet>
				<Intro>
					<p>
						Hi! I’m a web developer and designer at{' '}
						<a href="https://tulastudio.se" target="_blank" rel="noopener">
							Tula Studio
						</a>{' '}
						in Malmö, Sweden. Have a look at some of the projects I’ve worked on
						below, and <a href="mailto:peter@simonsson.com">contact me</a> if
						you want to talk further.
					</p>
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
				siteUrl
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
