import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { metaFontFamily, metaFontSize } from '../../styles/variables';

type PostProps = {
	post: any;
	className?: string;
};

const Post: React.FC<PostProps> = ({
	post: {
		frontmatter: { title, excerpt, date, timestamp },
		fields: { slug },
	},
}) => (
	<BlogItemBlock className="h-entry">
		<Heading>
			<Link href="/post/[slug]" as={`/post/${slug}`}>
				<a className="u-url p-name">{title}</a>
			</Link>
		</Heading>
		<Excerpt>
			<span className="p-summary">{excerpt}</span>{' '}
			<Link href="/post/[slug]" as={`/post/${slug}`}>
				<a>Read more »</a>
			</Link>
		</Excerpt>
		<Time dateTime={timestamp} className="dt-published">
			{date}
		</Time>
	</BlogItemBlock>
);

export default Post;

/**
 * Styled components
 */

const BlogItemBlock = styled.div`
	margin: 1.5rem 0;

	& + & {
		padding-top: 1.5rem;
		border-top: 1px solid var(--accent-color);
	}
`;

const Time = styled.time`
	color: var(--grayed-color);
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
