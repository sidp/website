'use client';

import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import { type FC, useRef } from 'react';
import type { ImageFields } from '../../types';
import cx from '../../utils/cx';
import { client } from '../../utils/sanity-client';
import { usePlayInView } from '../../utils/use-play-in-view';
import { useReducedMotion } from '../../utils/use-reduced-motion';
import Image from '../image';

const builder = imageUrlBuilder(client);

type ThumbnailVideoProps = {
	url: string;
	image: ImageFields;
	loading?: 'lazy' | 'eager';
	sizes: string;
	className?: string;
};

const ThumbnailVideo: FC<ThumbnailVideoProps> = ({
	url,
	image,
	loading,
	sizes,
	className,
}) => {
	const ref = useRef<HTMLVideoElement>(null);
	const reducedMotion = useReducedMotion();

	usePlayInView(ref, !reducedMotion);

	if (reducedMotion) {
		return (
			<Image
				image={image}
				loading={loading}
				width={3200}
				height={2400}
				sizes={sizes}
				className={className}
			/>
		);
	}

	const posterUrl = image.asset
		? builder.image(image.asset).width(800).url()
		: undefined;

	return (
		<video
			ref={ref}
			className={cx(className, 'w-full')}
			src={url}
			poster={posterUrl}
			muted
			loop
			playsInline
			aria-hidden="true"
			preload={loading === 'eager' ? 'auto' : 'metadata'}
		/>
	);
};

export default ThumbnailVideo;
