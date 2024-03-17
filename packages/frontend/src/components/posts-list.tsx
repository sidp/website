import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Columns, { Column } from './columns';
import { fadeIn, cubicBezierFadeIn, metaFontSize } from '../styles/variables';
import { Post } from '../types';

type PostsListProps = {
	title?: string;
	posts: Post[];
};

const PostsList: React.FC<PostsListProps> = ({ title = '', posts }) => {
	return (
		<Block>
			{title && <Title>{title}</Title>}

			<Columns className="h-feed">
				{posts.map((post) => {
					return (
						<AnimatedColumn
							span={{ '<small': 12, '>small': 6, '>medium': 4 }}
							key={post._id}
						>
							<div className="h-entry">
								<StyledLink className="u-url" href={`/${post.slug.current}`}>
									<PostTitle className="p-name">{post.title}</PostTitle>
									{post.description && <Body>{post.description}</Body>}
								</StyledLink>
							</div>
						</AnimatedColumn>
					);
				})}
			</Columns>
		</Block>
	);
};

export default PostsList;

/**
 * Styled components
 */

const Block = styled.div`
	&:not(:first-child) {
		margin-top: 3rem;
	}

	&:not(:last-child) {
		margin-bottom: 5rem;
	}
`;

const Title = styled.h2`
	margin-top: 0;
	margin-bottom: 0.75rem;
	animation: ${fadeIn} 400ms 100ms ${cubicBezierFadeIn} both;
`;

let animationDelaySequence = '';
for (let i = 0; i < 12; i += 1) {
	animationDelaySequence += `
		&:nth-child(1n+${i}) { animation-delay: ${100 + 60 * i}ms; }
	`;
}

const AnimatedColumn = styled(Column)`
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
	${animationDelaySequence};
`;

const StyledLink = styled(Link)`
	color: inherit;
	display: inline-block;
	box-shadow: none;

	&:hover,
	&:active {
		color: inherit;
	}
`;

const PostTitle = styled.h3`
	font-size: 1.1rem;
	line-height: 1.3;
	font-weight: 600;
	margin-top: 0.25rem;
	margin-bottom: 0.45rem;
`;

const Meta = styled.p`
	color: var(--grayed-color);
	font-size: ${metaFontSize};
	font-family: var(--sans-serif-font-family);
	margin-top: 0;
	margin-bottom: 0;
`;

const Body = styled.div`
	margin-top: 0.15rem;
	margin-bottom: 0.35rem;
	font-size: 0.85rem;

	p:last-child {
		margin-bottom: 0;
	}
`;
