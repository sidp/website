export function absoluteUrl(url = ''): string {
	if (url.indexOf('http') === 0) {
		return url;
	}
	return process.env.NEXT_PUBLIC_APP_URL + url;
}

export const getDomain = (url: string, fqdn = false) => {
	const [domain] = url.replace(/https?:\/\//, '').split(/[/?#]/);

	if (!fqdn) {
		return domain.replace(/^www\./, '');
	}

	return domain;
};

export const isExternal = (url: string): boolean => {
	return (
		url.match(/^https?:\/\//) !== null &&
		!!process.env.NEXT_PUBLIC_APP_URL &&
		!url.startsWith(process.env.NEXT_PUBLIC_APP_URL)
	);
};
