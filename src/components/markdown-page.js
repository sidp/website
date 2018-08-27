import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { pageProps } from './prop-types';

import { TextWrapper } from '../styles/components';

const renderBody = ({ title, body }) => (
	<React.Fragment>
		{title}
		{body}
	</React.Fragment>
);

const MarkdownPage = ({
	page: { frontmatter, html },
	htmlElement = 'article',
	render = renderBody,
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
			{render({
				title: <h1>{frontmatter.heading || frontmatter.title}</h1>,
				body: <div dangerouslySetInnerHTML={{ __html: html }} />,
			})}
		</PageWrap>
	);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
