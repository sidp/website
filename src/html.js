import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';

const Html = ({ headComponents, body, postBodyComponents }) => {
	const helmet = Helmet.rewind();

	const htmlAttrs = helmet.htmlAttributes.toComponent();
	const bodyAttrs = helmet.bodyAttributes.toComponent();

	let css;
	if (process.env.NODE_ENV === 'production') {
		css = (
			<style
				id="gatsby-inlined-css"
				dangerouslySetInnerHTML={{
					__html: require('!raw!../public/styles.css'),
				}}
			/>
		);
	}

	return (
		<html lang="en" {...htmlAttrs}>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{helmet.title.toComponent()}
				{helmet.meta.toComponent()}
				{helmet.link.toComponent()}
				<link
					rel="icon"
					type="image/x-icon"
					href={require('./static/favicon.ico')}
				/>
				<TypographyStyle typography={typography} />
				<GoogleFont typography={typography} />
				{css}
				{headComponents}
			</head>
			<body {...bodyAttrs}>
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
				{postBodyComponents}
			</body>
		</html>
	);
};

Html.propTypes = {
	body: PropTypes.string,
};

export default Html;
