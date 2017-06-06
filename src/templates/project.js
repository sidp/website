import React from 'react';
import PropTypes from 'prop-types';
import Project from '../components/project';
import ProjectList from '../components/project-list';

const ProjectTemplate = ({ data }) => {
	const page = data.markdownRemark;
	const projects = data.allMarkdownRemark.edges.map(edge => edge.node);
	// todo: return array once React 16 is released
	return (
		<div>
			<Project page={page} />
			<ProjectList title="More Projects" projects={projects} />
		</div>
	);
};

export default ProjectTemplate;

export const pageQuery = graphql`
	query ProjectBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			...Project_details
		}
		allMarkdownRemark(
			fields: {
				type: {eq: "project" }
				slug: {ne: $slug}
			},
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
