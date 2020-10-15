import React from 'react';
import Post from './post';

type PostsList = {
	posts: any[];
};

const PostsList = ({ posts }) => (
	<>
		{posts.map((post) => (
			<Post post={post} key={post.fields.slug} className="h-feed" />
		))}
	</>
);

export default PostsList;
