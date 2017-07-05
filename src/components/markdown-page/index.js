import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({
	page: { frontmatter, html },
	className = '',
	HtmlElement = 'article',
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

	return (
		<HtmlElement
			className={`markdown ${className} ${utils['text-wrapper']}`}
			{...props}
		>
			<Helmet>
				<title>
					{frontmatter.title}
				</title>
				{meta}
			</Helmet>
			<h1>
				{frontmatter.heading || frontmatter.title}
			</h1>
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
