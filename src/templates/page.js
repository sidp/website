import React from 'react';
import PropTypes from 'prop-types';

import MarkdownPage from '../components/markdown-page';

const PageTemplate = ({ data }) => {
	const page = data.markdownRemark;
	return <MarkdownPage page={page} role="main" />;
};

export default PageTemplate;

export const pageQuery = graphql`
	query PageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			frontmatter {
				title
				heading
				description
			}
			html
		}
	}
`;
