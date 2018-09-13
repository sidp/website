import React from 'react';
import Post from './post';

const PostsList = ({ posts }) => (
	<>
		{posts.map(post => (
			<Post post={post} key={post.fields.slug} className="h-feed" />
		))}
	</>
);

export default PostsList;
