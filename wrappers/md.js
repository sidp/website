import React, { Component, PropTypes } from 'react';
import Project from '../components/project';

import 'css/markdown-styles.css';
import utils from 'css/utils.module';

const MarkdownPage = (props) => {
	const post = props.route.page.data;

	if (post.path.indexOf('/project') === 0) {
		return (<Project post={post} />);
	}

	return (
		<div className={`markdown ${utils['text-wrapper']}`}>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.body }} />
		</div>
	);
}

MarkdownPage.propTypes = {
	router: PropTypes.object,
};

export default MarkdownPage;
