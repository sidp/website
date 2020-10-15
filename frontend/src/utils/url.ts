import { Image } from '../types';

export function absoluteUrl(link = '') {
	if (link.indexOf('http') === 0) {
		return link;
	}
	return process.env.APP_BASENAME + link;
}

export const uploadUrl = (url: string) => {
	const hasProtocol = url.match(/^https?:\/\//);

	if (hasProtocol) {
		return url;
	}

	return (process.env.NEXT_PUBLIC_UPLOAD_PREFIX || '') + url;
};

export const srcSet = (image: Image) => {
	let largestWidth = 0;
	const set: [number, string][] = [];

	for (const formatKey of Object.keys(image.formats)) {
		const format = image.formats[formatKey];
		set.push([format.width, `${uploadUrl(format.url)} ${format.width}w`]);

		if (format.width > largestWidth) {
			largestWidth = format.width;
		}
	}

	if (largestWidth < image.width) {
		set.push([image.width, `${uploadUrl(image.url)} ${image.width}w`]);
	}

	set.sort(([aw], [bw]) => aw - bw);

	return set.map(([_, s]) => s).join(', ');
};
