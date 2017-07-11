import React from 'react';
import Helmet from 'react-helmet';

import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

const Index = ({ data }) => {
	const projects = data.allMarkdownRemark.edges.map(edge => edge.node);
	const { siteMetadata } = data.site;

	return (
		<div>
			<Helmet>
				<meta name="description" content={siteMetadata.description} />
				<meta
					name="og:image"
					content={absoluteUrl(require('../static/images/og-image.png'))}
				/>
			</Helmet>

			<Intro />
			<ProjectList title="Projects" projects={projects} />
		</div>
	);
};

export const pageQuery = graphql`
	query indexPageData {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(
			filter: { fields: { type: { eq: "project" } } }
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

export default Index;
