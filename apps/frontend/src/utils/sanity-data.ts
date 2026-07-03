export const imageFields = `
	asset,
	alt,
	"width": asset->metadata.dimensions.width,
	"height": asset->metadata.dimensions.height,
	"color": asset->metadata.palette.dominant.background,
`;

export const postFields = `
	...,
	image {
		${imageFields}
	},
	body[] {
		...,
		_type == 'image' => {
			...,
			"width": asset->metadata.dimensions.width,
			"height": asset->metadata.dimensions.height,
			"color": asset->metadata.palette.dominant.background,
		},
		_type == 'video' => {
			...,
			"url": file.asset->url,
			poster {
				asset,
				"width": asset->metadata.dimensions.width,
				"height": asset->metadata.dimensions.height,
			},
		},
	}
`;

export const postListFields = `
	...,
	image {
		${imageFields}
	},
`;
