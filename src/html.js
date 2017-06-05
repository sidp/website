import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';

const Html = props => {
	const head = Helmet.rewind();

	let css;
	if (process.env.NODE_ENV === 'production') {
		css = (
			<style
				dangerouslySetInnerHTML={{
					__html: require('!raw!./public/styles.css'),
				}}
			/>
		);
	}

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{head.title.toComponent()}
				{head.meta.toComponent()}
				<link
					rel="icon"
					type="image/x-icon"
					href={require('./images/favicon.ico')}
				/>
				<TypographyStyle typography={typography} />
				<GoogleFont typography={typography} />
				{css}
				{props.headComponents}
			</head>
			<body>
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
				{props.postBodyComponents}
			</body>
		</html>
	);
};

Html.propTypes = {
	body: PropTypes.string,
};

export default Html;
