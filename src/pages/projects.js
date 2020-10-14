import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
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
				<ProjectList projects={projects} />
			</>
		);
	}
}

export const pageQuery = graphql`
	query projectsPageData {
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
	}
`;
