import React from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

const Index = ({ data }) => {
	const projects = data.allMarkdownRemark.edges.map(edge => edge.node);

	return (
		<div>
			<Helmet
				title={pageTitle()}
				meta={[
					{
						name: 'description',
						content: data.site.siteMetadata.description,
					},
				]}
			/>

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
			fields: { type: {eq: "project" } },
			sortBy: {
				fields: [frontmatter___weight]
				order: DESC
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
