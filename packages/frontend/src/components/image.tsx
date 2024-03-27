import { FC } from 'react';
import NextImage from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../utils/sanity-client';
import { SanityDecoratedImage } from '../types';

const builder = imageUrlBuilder(client);

type ImageProps = {
	image: SanityDecoratedImage;
	sizes: string;
	className?: string;
};

const Image: FC<ImageProps> = ({ image, sizes, className }) => {
	const { asset, width, height, lqip, alt, loading } = image;
	return (
		<NextImage
			src={builder.image(asset).size(width, height).quality(90).url()}
			alt={alt || ''}
			quality="90"
			loading={loading}
			placeholder="blur"
			blurDataURL={lqip}
			width={width}
			height={height}
			sizes={sizes}
			className={className}
			style={{ backgroundColor: image.color }}
		/>
	);
};

export default Image;
