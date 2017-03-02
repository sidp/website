import React, { Component, PropTypes } from 'react';

import { isProject } from '../utils/page-handling';
import MarkdownPage from '../components/markdown-page';
import Project from '../components/project';

const Markdown = ({ route }) => {
	const page = route.page.data;

	if (isProject(page)) {
		return (<Project page={page} />);
	}

	return (<MarkdownPage page={page} />);
}

Markdown.propTypes = {
	route: PropTypes.object,
};

export default Markdown;
