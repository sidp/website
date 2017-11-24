import React from 'react';
import BlogItem from './blog-item';

const BlogList = ({ posts }) => (
	<div>
		<p>
			There are {posts.length} blog {posts.length === 1 ? 'post' : 'posts'}:
		</p>
		{posts.map(post => <BlogItem post={post} key={post.fields.slug} />)}
	</div>
);

export default BlogList;
