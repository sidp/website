import { siteMetadata, pathPrefix } from '../../gatsby-config';

export default function absoluteUrl(link = '') {
	if (link.indexOf('http') === 0) {
		return link;
	}
	return siteMetadata.siteUrl + (pathPrefix || '') + link;
}
