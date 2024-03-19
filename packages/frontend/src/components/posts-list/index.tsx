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
	return (
		<Section>
			{title && <Heading className="mb-3">{title}</Heading>}

			<Columns>
				{posts.map((post) => {
					return <PostItem key={post._id} post={post} />;
				})}
			</Columns>
		</Section>
	);
};

export default PostsList;
