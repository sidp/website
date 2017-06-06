import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';
import pageTitle from '../../utils/page-title';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({
	page: { frontmatter, html },
	className = '',
	htmlElement = 'article',
	role = '',
}) => {
	const props = {
		className: `markdown ${className} ${utils['text-wrapper']}`,
	};

	if (role) {
		props.role = role;
	}

	const meta = [];
	if (frontmatter.description) {
		meta.push({
			name: 'description',
			content: frontmatter.description,
		});
	}

	const children = [
		<Helmet title={pageTitle(frontmatter)} meta={meta} key="helmet" />,
		<h1 key="title">{frontmatter.heading || frontmatter.title}</h1>,
		<div dangerouslySetInnerHTML={{ __html: html }} key="body" />,
	];

	return createElement(htmlElement, props, children);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
