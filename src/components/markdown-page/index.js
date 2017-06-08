import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';
import pageTitle from '../../utils/page-title';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({
	page: { frontmatter, html },
	className = '',
	HtmlElement = 'article',
	role = '',
}) => {
	const meta = [];
	if (frontmatter.description) {
		meta.push({
			name: 'description',
			content: frontmatter.description,
		});
	}

	return (
		<HtmlElement
			className={`markdown ${className} ${utils['text-wrapper']}`}
			role={role}
		>
			<Helmet title={pageTitle(frontmatter)} meta={meta} key="helmet" />
			<h1 key="title">{frontmatter.heading || frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} key="body" />
		</HtmlElement>
	);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
