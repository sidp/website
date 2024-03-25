export const postFields = `
	...,
	image {
		asset,
		alt,
		"width": asset->metadata.dimensions.width,
		"height": asset->metadata.dimensions.height,
		"lqip": asset->metadata.lqip,
	}
`;
