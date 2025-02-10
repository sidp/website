import imageUrlBuilder from '@sanity/image-url';
import NextImage from 'next/image';
import type { FC } from 'react';
import type { ImageFields } from '../types';
import { client } from '../utils/sanity-client';

const builder = imageUrlBuilder(client);

type ImageProps = {
	image: ImageFields;
	width: number;
	height: number;
	loading?: 'lazy' | 'eager';
	sizes: string;
	className?: string;
};

const Image: FC<ImageProps> = ({
	image,
	width,
	height,
	loading,
	sizes,
	className,
}) => {
	const { asset, alt } = image;

	if (!asset) {
		return null;
	}

	return (
		<NextImage
			src={builder.image(asset).size(width, height).quality(90).url()}
			alt={alt || ''}
			quality="90"
			loading={loading}
			priority={loading === 'eager'}
			width={width}
			height={height}
			sizes={sizes}
			className={className}
			style={{ backgroundColor: image.color || undefined }}
		/>
	);
};

export default Image;
