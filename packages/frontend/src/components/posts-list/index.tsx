import * as React from 'react';
import Columns from '../columns';
import { Post } from '../../types';
import PostItem from './post-item';
import Heading from '../heading';
import Section from '../section';

type PostsListProps = {
	title?: string;
	posts: Post[];
};

const PostsList: React.FC<PostsListProps> = ({ title = '', posts }) => {
	if (posts.length === 0) {
		return null;
	}

	return (
		<Section>
			{title && <Heading className="mb-6">{title}</Heading>}

			<Columns
				maxColumns={posts.some((post) => post.type === 'project') ? 3 : 2}
			>
				{posts.map((post) => {
					return <PostItem key={post._id} post={post} />;
				})}
			</Columns>
		</Section>
	);
};

export default PostsList;
