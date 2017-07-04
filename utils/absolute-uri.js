import { prefixLink } from 'gatsby-helpers';
import { config } from '../config';
export default function absoluteUrl(link = '') {
	if (link.indexOf('http') === 0) {
		return link;
	}
	return config.hostname + prefixLink(link);
}
