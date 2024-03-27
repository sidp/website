export const imageFields = `
	asset,
	alt,
	"width": asset->metadata.dimensions.width,
	"height": asset->metadata.dimensions.height,
	"lqip": asset->metadata.lqip,
`;

export const postFields = `
	...,
	image {
		${imageFields}
	}
`;
