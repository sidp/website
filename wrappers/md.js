import React, { Component, PropTypes } from 'react';

import { isProject } from '../utils/page-handling';
import MarkdownPage from '../components/markdown-page';
import Project from '../components/project';

const Markdown = (props) => {
	const page = props.route.page.data;

	if (isProject(page)) {
		return (<Project page={page} />);
	}

	return (<MarkdownPage page={page} />);
}

Markdown.propTypes = {
	router: PropTypes.object,
};

export default Markdown;
