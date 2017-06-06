import React from 'react';
import PropTypes from 'prop-types';

import About from '../components/about';

const AboutTemplate = ({ data }) => {
	const page = data.markdownRemark;
	return <About page={page} />;
};

export default AboutTemplate;

export const pageQuery = graphql`
	query AboutPageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			...AboutPage_details
		}
	}
`;
