import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export function absoluteUrl(url = ''): string {
	if (url.indexOf('http') === 0) {
		return url;
	}
	return publicRuntimeConfig.siteUrl + url;
}

export const getDomain = (url: string, fqdn = false) => {
	const [domain] = url.replace(/https?:\/\//, '').split(/[/?#]/);

	if (!fqdn) {
		return domain.replace(/^www\./, '');
	}

	return domain;
};
