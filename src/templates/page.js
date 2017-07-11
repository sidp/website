import React from 'react';
import PropTypes from 'prop-types';

import MarkdownPage from '../components/markdown-page';

export default function Page({ data: { markdownRemark: page } }) {
	return <MarkdownPage page={page} role="main" />;
}

export const pageQuery = graphql`
	query PageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				heading
				description
			}
			html
		}
	}
`;
