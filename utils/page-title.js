/**
 * A function that takes a page object and returns an appropriate page title
 */

import { config } from '../config';

const divider = ' – ';

export default function pageTitle(page = {}) {
	const parts = [];

	if (page.title && page.path !== '/') {
		parts.push(page.title);
	}

	parts.push(config.siteTitle);

	return parts.join(divider);
}
