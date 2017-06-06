import React from 'react';
import PropTypes from 'prop-types';

import { isAbout, isProject } from '../utils/page-handling';
import MarkdownPage from '../components/markdown-page';

const PageTemplate = ({ data }) => {
	const page = data.markdownRemark;
	return <MarkdownPage page={page} />;
};

export default PageTemplate;

export const pageQuery = graphql`
	query PageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			frontmatter {
				title,
				heading
				description,
			}
			html
		}
	}
`;
