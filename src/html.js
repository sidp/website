import React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';
import favicon from './static/favicon.ico';

const Html = ({ headComponents, body, postBodyComponents }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/x-icon" href={favicon} />
				<TypographyStyle typography={typography} />
				<GoogleFont typography={typography} />
				<script
					async
					defer
					data-domain="simonsson.com"
					src="https://st.simonsson.com/js/index.js"
				></script>
				{headComponents}
			</head>
			<body>
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
				{postBodyComponents}
			</body>
		</html>
	);
};

export default Html;
