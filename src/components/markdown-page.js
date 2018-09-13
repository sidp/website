import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { TextWrapper } from '../styles/components';

const renderBody = ({ title, body }) => (
	<>
		{title}
		{body}
	</>
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

	return (
		<TextWrapper as={htmlElement} className="h-entry" {...props}>
			<Helmet>
				<title>{frontmatter.title}</title>
				{meta}
			</Helmet>
			{render({
				title: (
					<h1 className="p-name">{frontmatter.heading || frontmatter.title}</h1>
				),
				body: (
					<div
						className="e-content"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				),
			})}
		</TextWrapper>
	);
};

MarkdownPage.propTypes = {
	page: PropTypes.object.isRequired,
	className: PropTypes.string,
	htmlElement: PropTypes.string,
	role: PropTypes.string,
};

export default MarkdownPage;
