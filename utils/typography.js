import ReactDOM from 'react-dom/server'
import React from 'react'
import Typography from 'typography'
import { GoogleFont } from 'react-typography'
import CodePlugin from 'typography-plugin-code'

const options = {
	googleFonts: [
		{
			name: 'Source Sans Pro',
			styles: [
				'400',
				'600',
				'700',
			],
		},
	],
	headerFontFamily: ['Source Sans Pro', 'sans-serif'],
	headerWeight: '600',
	headerColor: '#384047',
	bodyFontFamily: ['Source Sans Pro', 'sans-serif'],
	bodyColor: '#212b35',
	baseFontSize: '18px',
	baseLineHeight: 1.55,
	boldWeight: '600',
	scaleRatio: 2.0,
	blockMarginBottom: 0.5,
	plugins: [
		new CodePlugin(),
	],
	overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
		/*'h1, h2, h3': {
			marginTop: rhythm(0.75),
			marginBottom: rhythm(0.25),
		},
		'h2 + h3': {
			marginTop: rhythm(0.25),
		},
		'h3': {
			fontSize: '1.1rem',
		},*/
	})
};

const typography = new Typography(options);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
	typography.injectStyles();
	if (typeof document !== 'undefined') {
		const googleFonts = ReactDOM.renderToStaticMarkup(
			React.createFactory(GoogleFont)({ typography })
		);
		const head = document.getElementsByTagName('head')[0];
		head.insertAdjacentHTML('beforeend', googleFonts);
	}
}

export default typography
