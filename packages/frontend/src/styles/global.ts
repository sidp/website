import { createGlobalStyle } from 'styled-components';
import {
	accentColor,
	textColor,
	linkColor,
	linkColorHover,
	linkColorActive,
	linkBoxShadow,
	sansSerifFontFamily,
	monoFontFamily,
	paleAccentColor,
	grayedColorHover,
	grayedColor,
	grayedColorActive,
	serifFontFamily,
} from './variables';

const GlobalStyle = createGlobalStyle`
	:root {
		/* Colors */
		--background-color: #fff;
		--text-color: ${textColor};
		--accent-color: ${accentColor};
		--pale-accent-color: ${paleAccentColor};
		--grayed-color: ${grayedColor};
		--grayed-color--hover: ${grayedColorHover};
		--grayed-color--active: ${grayedColorActive};

		--link-color: ${linkColor};
		--focus-color: var(--link-color);
		--link-color--hover: ${linkColorHover};
		--link-color--active: ${linkColorActive};

		--input-color: inherit;
		--input-background: transparent;
		--input-border: #E0CCDB;

		--button-color: #fff;
		--button-background: var(--link-color);
		--button-border: var(--link-color);

		--image-frame: rgba(0, 0, 0, 0.05);
		--image-shadow: rgba(0, 0, 0, 0.16);

		/* Fonts */
		--sans-serif-font-family: ${sansSerifFontFamily};
		--serif-font-family: ${serifFontFamily};
		--mono-font-family: ${monoFontFamily};
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--text-color: #fff;
			--background-color: #110d11;
			--accent-color: #221a2a;
			--pale-accent-color: #221a2a;
			--grayed-color: #968796;

			--image-frame: rgba(255, 255, 255, 0.05);
			--image-shadow: rgba(255, 255, 255, 0.05);

			--link-color--hover: #7bcaff;
			--link-color--active: ${linkColor};

			--input-color: inherit;
			--input-border: #473A53;

			--button-color: #fff;
		}
	}

	html {
		background-color: var(--accent-color);

		font-family: 'Source Serif Pro', sans-serif;
		font-size: 19px;
		line-height: 1.5;
	}

	strong,
	b,
	th {
		font-weight: 600;
	}

	body {
		overflow-x: hidden;
		color: var(--text-color);
		background-color: var(--background-color);
		box-shadow: inset 0 4px var(--accent-color), inset 0 -4px var(--accent-color);
		margin: 0;
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		transition: color 100ms linear, box-shadow 100ms linear;

		&:hover {
			color: var(--link-color--hover);
		}

		&:active {
			transition: none;
			color: var(--link-color--active);
		}
	}

	/* Apply a colored underline to links directly inside paragraphs */
	p > a {
		color: var(--text-color);
		box-shadow: ${linkBoxShadow} var(--link-color);
	}

	h1,
	h2,
	h3 {
		& > a {
			color: inherit;
		}
	}

	/**
	 * Vertical flow of typography
	 */

	p,
	ul,
	ol,
	table,
	figure,
	blockquote,
	dl,
	h1,
	h2,
	h3,
	h4 {
		margin-top: 0;
		margin-bottom: 0;
	}

	p:not(:last-child),
	ul:not(:last-child),
	ol:not(:last-child),
	table:not(:last-child),
	figure:not(:last-child),
	blockquote:not(:last-child),
	dl:not(:last-child) {
		margin-bottom: 1rem;
	}

	h1,
	h2,
	h3 {
		font-family: 'Source Sans Pro', sans-serif;
		font-weight: 600;
		font-feature-settings: "onum" 1;
	}

	h1 {
		font-size: 2rem;
		letter-spacing: -0.007em;
		line-height: 1.2;
		margin-bottom: 0.75rem;
	}

	h2,
	h3 {
		margin-top: 0.75rem;
		margin-bottom: 0.25rem;
	}

	h2 {
		font-size: 1.1rem;
	}

	h3 {
		font-size: 0.9rem;
	}

	p {
		font-feature-settings: "onum" 1, "pnum" 1;
	}

	table {
		font-family: var(--sans-serif-font-family);
		font-size: 0.85rem;
		margin-bottom: 1rem;
		border-collapse: collapse;
	}

	.e-content table {
		width: 100%;
	}

	.e-content img {
		max-width: 100%;
		height: auto;
	}

	th,
	td {
		padding-top: 0.4rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--accent-color);
		background-color: rgba(255, 255, 255, 0);
		transition: background-color 150ms linear;
	}

	tr:hover td {
		background-color: color(var(--accent-color) alpha(10%));
	}

	hr {
		border: 0;
		border-top: var(--accent-color) solid 2px;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	@media screen and (max-width: 640px) {

		html {
			font-size: 100%;
		}
	}

	@media screen and (min-width: 1400px) {

		html {
			font-size: 131.25%;
		}
	}

	/**
	 * Code blocks
	 */

	code {
		font-size: 0.95em;
		font-family: var(--mono-font-family), monospace;
		font-feature-settings: "onum" 0, "pnum" 0;

		background-color: var(--pale-accent-color);
		box-shadow: inset 0 0 0 0.05rem var(--image-frame);
		border-radius: 0.15rem;
	}

	code {
		font-family: var(--mono-font-family);
	}

	pre code {
		display: block;
		font-size: 0.85em;
		padding: 0.1rem 0.25rem 0.2rem;
		margin-left: -0.15rem;
		margin-right: -0.15rem;
	}
`;

export default GlobalStyle;
