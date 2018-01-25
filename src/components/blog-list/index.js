import React from 'react';
import BlogItem from './blog-item';

const BlogList = ({ posts }) => (
	<div>
		{posts.map(post => <BlogItem post={post} key={post.fields.slug} />)}
	</div>
);

export default BlogList;
