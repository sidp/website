import * as React from 'react';
import Columns from '../columns';
import Heading from '../heading';
import Section from '../section';
import PostItem from './post-item';
import { isValidPostItem, type PostItem as PostItemType } from './types';

type PostsListProps = {
	title?: string;
	posts: PostItemType[];
	priorityImageLoading?: boolean;
	className?: string;
};

const PostsList: React.FC<PostsListProps> = ({
	title = '',
	posts,
	priorityImageLoading = false,
	className,
}) => {
	const validPosts = posts.filter(isValidPostItem);
	if (validPosts.length === 0) {
		return null;
	}

	const maxColumns = validPosts.some((post) => post.type === 'project') ? 3 : 2;

	return (
		<Section className={className}>
			{title && <Heading className="mb-6">{title}</Heading>}

			<Columns maxColumns={maxColumns}>
				{validPosts.map((post, index) => {
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
