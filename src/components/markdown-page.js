import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from './prop-types';

import { TextWrapper } from '../styles/components';

const MarkdownPage = ({
	page: { frontmatter, html },
	htmlElement = 'article',
	children,
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

	const PageWrap = TextWrapper.withComponent(htmlElement);

	return (
		<PageWrap {...props}>
			<Helmet>
				<title>{frontmatter.title}</title>
				{meta}
			</Helmet>
			<h1>{frontmatter.heading || frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</PageWrap>
	);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
	children: PropTypes.node,
};

export default MarkdownPage;
