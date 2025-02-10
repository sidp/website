import * as React from 'react';
import Columns from '../columns';
import { Post } from '../../types';
import PostItem from './post-item';
import Heading from '../heading';
import Section from '../section';

type PostsListProps = {
	title?: string;
	posts: Post[];
	priorityImageLoading?: boolean;
	className?: string;
};

const PostsList: React.FC<PostsListProps> = ({
	title = '',
	posts,
	priorityImageLoading = false,
	className,
}) => {
	if (posts.length === 0) {
		return null;
	}

	const maxColumns = posts.some((post) => post.type === 'project') ? 3 : 2;

	return (
		<Section className={className}>
			{title && <Heading className="mb-6">{title}</Heading>}

			<Columns maxColumns={maxColumns}>
				{posts.map((post, index) => {
					return (
						<PostItem
							key={post._id}
							post={post}
							loading={
								priorityImageLoading && index < maxColumns ? 'eager' : 'lazy'
							}
						/>
					);
				})}
			</Columns>
		</Section>
	);
};

export default PostsList;
