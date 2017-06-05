import React from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import { getProjects } from '../utils/page-handling';
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
		allMarkdownRemark(fields: { type: {eq: "project" } }) {
			edges {
				node {
					frontmatter {
						title
						client,
						year
					}
					fields {
						slug
					}
				}
			}
		}
	}
`;

export default Index;
