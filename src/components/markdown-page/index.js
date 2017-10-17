import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({
	page: { frontmatter, html },
	className = '',
	htmlElement = 'article',
	...props
}) => {
	const meta = [];
	if (frontmatter.description) {
		meta.push(
			<meta
				name="description"
				content={frontmatter.description}
				key="description"
			/>
		);
	}

	return createElement(
		htmlElement,
		{
			className: `markdown ${className} ${utils['text-wrapper']}`,
			...props,
		},
		[
			<Helmet key="helmet">
				<title>{frontmatter.title}</title>
				{meta}
			</Helmet>,
			<h1 key="heading">{frontmatter.heading || frontmatter.title}</h1>,
			<div key="body" dangerouslySetInnerHTML={{ __html: html }} key="body" />,
		]
	);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
