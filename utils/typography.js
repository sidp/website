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
		{
			name: 'Source Serif Pro',
			styles: [
				'400',
			],
		},
	],
	headerFontFamily: ['Source Sans Pro', 'sans-serif'],
	headerWeight: '600',
	headerColor: '#221A2A',
	bodyFontFamily: ['Source Serif Pro', 'sans-serif'],
	bodyColor: '#221A2A',
	baseFontSize: '19px',
	baseLineHeight: 1.5,
	boldWeight: '600',
	scaleRatio: 2.0,
	blockMarginBottom: 0.5,
	plugins: [
		new CodePlugin(),
	],
	overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
		'h1, h2, h3': {
			marginTop: rhythm(0.75),
			marginBottom: rhythm(0.25),
		},
		'h2 + h3': {
			marginTop: rhythm(0.25),
		},
		'h2': {
			fontSize: '1.1rem',
		},
		'h3': {
			fontSize: '0.9rem',
		},
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

export default typography;
