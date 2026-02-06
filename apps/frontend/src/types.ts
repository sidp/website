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
