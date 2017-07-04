import React from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

const Index = ({ data }) => {
	const projects = data.allMarkdownRemark.edges.map(edge => edge.node);

	return (
		<div>
			<Helmet>
				<title>
					{pageTitle()}
				</title>
				<meta name="description" content={data.site.siteMetadata.description} />
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
			filter: { fields: { type: {eq: "project" } } },
			sort: {
				order: DESC,
				fields: [frontmatter___weight]
			}
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
