import React from 'react';
import PropTypes from 'prop-types';

import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
	try {
		stylesStr = require('!raw-loader!../public/styles.css');
	} catch (e) {
		console.log(e);
	}
}

const Html = ({ headComponents, body, postBodyComponents }) => {
	let css;
	if (process.env.NODE_ENV === 'production') {
		css = (
			<style
				id="gatsby-inlined-css"
				dangerouslySetInnerHTML={{ __html: stylesStr }}
			/>
		);
	}

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
			<body>
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