import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import { isProject } from '../utils/page-handling';
import Project from '../components/project';

import 'css/markdown-styles.css';
import utils from 'css/utils.module.css';

const MarkdownPage = (props) => {
	const page = props.route.page.data;

	if (isProject(page)) {
		return (<Project page={page} />);
	}

	return (
		<div className={`markdown ${utils['text-wrapper']}`}>
			<Helmet title={pageTitle(page)} />
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.body }} />
		</div>
	);
}

MarkdownPage.propTypes = {
	router: PropTypes.object,
};

export default MarkdownPage;
