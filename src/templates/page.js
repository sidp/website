import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarkdownPage from '../components/markdown-page';

export default class Page extends Component {
	render() {
		const { data: { markdownRemark: page } } = this.props;
		return <MarkdownPage page={page} role="main" />;
	}
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
