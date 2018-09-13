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
} from './variables';

const GlobalStyle = createGlobalStyle`
	html {
		background-color: ${accentColor};
	}

	body {
		overflow-x: hidden;
		background-color: #fff;
		box-shadow: inset 0 4px ${accentColor}, inset 0 -4px ${accentColor};
	}

	a {
		text-decoration: none;
		color: ${linkColor};
		transition: color 100ms linear, box-shadow 100ms linear;

		&:hover {
			color: ${linkColorHover};
		}

		&:active {
			color: ${linkColorActive};
		}
	}

	/* Apply a colored underline to links directly inside paragraphs */
	p > a {
		color: ${textColor};
		box-shadow: ${linkBoxShadow} ${linkColor};
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
		font-family: ${sansSerifFontFamily};
		font-size: 0.8425rem;
		margin-bottom: 1rem;
	}

	th, td {
		padding-top: 0.4rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid ${accentColor};
		background-color: rgba(255, 255, 255, 0);
		transition: background-color 150ms linear;
	}

	tr:hover td {
		background-color: color(${accentColor} alpha(10%));
	}

	code {
		font-family: ${monoFontFamily}, monospace;
		font-feature-settings: "onum" 0, "pnum" 0;
		padding-top: 0.15em;
		padding-bottom: 0.15em;

		background-color: ${paleAccentColor};
		box-shadow: inset 0 0 0 1px ${accentColor};

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
