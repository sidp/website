import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from './utils/typography';

const Html = ({ headComponents, body, postBodyComponents }) => {
	const head = Helmet.rewind();

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
