import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import {
	accentColor,
	grayedColor,
	metaFontFamily,
	metaFontSize,
} from '../../styles/variables';

const Post = ({
	post: {
		frontmatter: { title, excerpt, date, timestamp },
		fields: { slug },
	},
}) => (
	<BlogItemBlock className="h-entry">
		<Heading>
			<Link to={slug} className="u-url p-name">
				{title}
			</Link>
		</Heading>
		<Excerpt>
			<span className="p-summary">{excerpt}</span>{' '}
			<Link to={slug}>Read more »</Link>
		</Excerpt>
		<Time dateTime={timestamp} className="dt-published">
			{date}
		</Time>
	</BlogItemBlock>
);

export default Post;

/**
 * GraphQL
 */

export const postListItemFragment = graphql`
	fragment PostList_item on MarkdownRemark {
		frontmatter {
			title
			excerpt
			date: published(formatString: "MMMM d, YYYY")
			timestamp: published
		}
		fields {
			slug
		}
		html
	}
`;

/**
 * Styled components
 */

const BlogItemBlock = styled.div`
	margin: 1.5rem 0;

	& + & {
		padding-top: 1.5rem;
		border-top: 1px solid ${accentColor};
	}
`;

const Time = styled.time`
	color: ${grayedColor};
	font-family: ${metaFontFamily};
	font-size: ${metaFontSize};
`;

const Heading = styled.h2`
	margin-top: 0;

	${Time} + & {
		margin-top: 0.325rem;
	}
`;

const Excerpt = styled.p`
	margin-bottom: 0.275rem;
`;
