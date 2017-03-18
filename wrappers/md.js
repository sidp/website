import React, { Component, PropTypes } from 'react';

import { isAbout, isProject } from '../utils/page-handling';
import MarkdownPage from '../components/markdown-page';
import About from '../components/about';
import Project from '../components/project';

const Markdown = ({ route }) => {
	const page = route.page.data;

	if (isAbout(page)) {
		return (<About page={page} />);
	}

	if (isProject(page)) {
		return (<Project page={page} />);
	}

	return (<MarkdownPage page={page} />);
}

Markdown.propTypes = {
	route: PropTypes.object,
};

export default Markdown;
