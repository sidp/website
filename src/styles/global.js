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
			--grayed-color: #968796;

			--image-frame: rgba(255, 255, 255, 0.05);
			--image-shadow: rgba(255, 255, 255, 0.05);

			--link-color--hover: #7bcaff;
			--link-color--active: ${linkColor};
		}
	}

	html {
		background-color: var(--accent-color);
	}

	body {
		overflow-x: hidden;
		color: var(--text-color);
		background-color: var(--background-color);
		box-shadow: inset 0 4px var(--accent-color), inset 0 -4px var(--accent-color);
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

	h1,
	h2,
	h3 {
		font-feature-settings: "onum" 1;
	}

	p {
		font-feature-settings: "onum" 1, "pnum" 1;
	}

	table {
		font-family: var(--sans-serif-font-family);
		font-size: 0.8425rem;
		margin-bottom: 1rem;
	}

	th, td {
		padding-top: 0.4rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--accent-color);
		background-color: rgba(255, 255, 255, 0);
		transition: background-color 150ms linear;
	}

	tr:hover td {
		background-color: color(var(--accent-color) alpha(10%));
	}

	code {
		font-family: var(--mono-font-family), monospace;
		font-feature-settings: "onum" 0, "pnum" 0;
		padding-top: 0.15em;
		padding-bottom: 0.15em;

		background-color: var(--pale-accent-color);
		box-shadow: inset 0 0 0 1px var(--accent-color);

		&::before,
		&::after {
			letter-spacing: -0.33em;
		}
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
`;

export default GlobalStyle;
