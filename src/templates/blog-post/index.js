import React, { Component } from 'react';

import { pageProps } from '../../components/prop-types';
import MarkdownPage from '../../components/markdown-page';
import Meta from '../../components/meta';

const MONTH_OF_YEAR = [
	'January',
	'February',
	'March',
	'April',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default class BlogPost extends Component {
	render() {
		const { data: { markdownRemark: page } } = this.props;
		const date = page.frontmatter.published
			? new Date(page.frontmatter.published)
			: false;

		let dateString = 'Unknown';
		if (date !== false) {
			const month = MONTH_OF_YEAR[date.getMonth()];
			dateString = `${month} ${date.getDate()}, ${date.getFullYear()}`;
		}

		return (
			<MarkdownPage page={page} role="main">
				<Meta published={dateString} />
				<time dateTime={date !== false && date.toISOString()}>
					{dateString}
				</time>
			</MarkdownPage>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				description
				published
			}
			html
		}
	}
`;
