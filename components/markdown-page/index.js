import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';
import pageTitle from '../../utils/page-title';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({
	page,
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

	if (page.title) {
		meta.push({
			property: 'og:title',
			content: page.title,
		});
	}

	if (page.description) {
		meta.push({
			name: 'description',
			content: page.description,
		});
	}

	const children = [
		<Helmet title={pageTitle(page)} meta={meta} key="helmet" />,
		<h1 key="title">
			{page.heading || page.title}
		</h1>,
		<div dangerouslySetInnerHTML={{ __html: page.body }} key="body" />,
	];

	return createElement(htmlElement, props, children);
};

MarkdownPage.propTypes = {
	page: pageProps.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
