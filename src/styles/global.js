import { injectGlobal } from 'styled-components';
import {
	accentColor,
	textColor,
	linkColor,
	linkColorHover,
	linkColorActive,
	linkBoxShadow,
} from './variables';

injectGlobal`
	html {
		background-color: ${accentColor};
	}

	body {
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
		font-feature-settings: "onum" 1;
	}

	p {
		font-feature-settings: "onum" 1, "pnum" 1;
	}

	@media screen and (max-width: 640px) {

		html {
			font-size: 100%;
		}
	}

	@media screen and (min-width: 1400px) {

		html {
			font-size: 125%;
		}
	}
`;
