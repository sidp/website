import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const BlogItem = ({
	post: {
		frontmatter: { title, description, date, timestamp },
		fields: { slug },
	},
}) => (
	<div>
		<hr />
		<time dateTime={timestamp}>{date}</time>
		<h2>{title}</h2>
		<p>
			{description} <Link to={slug}>Read more »</Link>
		</p>
	</div>
);

export default BlogItem;

/**
 * Styled components
 */

/**
 * GraphQL
 */

export const blogItemFragment = graphql`
	fragment Blog_item on MarkdownRemark {
		frontmatter {
			title
			description
			date: published(formatString: "MMMM d, YYYY")
			timestamp: published
		}
		fields {
			slug
		}
		html
	}
`;
