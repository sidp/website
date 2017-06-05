/**
 * A function that takes a page object and returns an appropriate page title
 */

import { siteMetadata } from '../../gatsby-config';

const divider = ' – ';

export default function pageTitle(page = {}) {
	const parts = [];

	if (page.title && page.path !== '/') {
		parts.push(page.title);
	}

	parts.push(siteMetadata.title);

	return parts.join(divider);
}
