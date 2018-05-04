import React, { Fragment } from 'react';
import Post from './post';

const PostsList = ({ posts }) => (
	<Fragment>
		{posts.map(post => <Post post={post} key={post.fields.slug} />)}
	</Fragment>
);

export default PostsList;
