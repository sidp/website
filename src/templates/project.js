import React from 'react';
import PropTypes from 'prop-types';
import Project from '../components/project';

const ProjectTemplate = ({ data }) => {
	const page = data.markdownRemark;
	return <Project page={page} />;
};

export default ProjectTemplate;

export const pageQuery = graphql`
	query ProjectBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			...Project_details
		}
	}
`;
