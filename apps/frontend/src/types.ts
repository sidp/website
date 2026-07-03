import type { SanityAsset } from '@sanity/image-url';
import type { SanityImageCrop, SanityImageHotspot } from '../sanity.types';
import type { SanityReference } from 'next-sanity';

/** Fields corresponding to imageFields in sanity-data.ts */
export type ImageFields = {
	asset?: SanityReference | SanityAsset | null;
	crop?: SanityImageCrop;
	hotspot?: SanityImageHotspot;
	alt?: string | null;
	loading?: 'lazy' | 'eager' | null;
	color?: string | null;
};

/** Fields corresponding to the video block projection in sanity-data.ts */
export type VideoFields = {
	url?: string | null;
	poster?: {
		asset?: SanityReference | SanityAsset | null;
		width?: number | null;
		height?: number | null;
	} | null;
	alt?: string | null;
	autoplay?: boolean | null;
	loading?: 'lazy' | 'eager' | null;
};
