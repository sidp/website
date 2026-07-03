'use client';

import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import { type FC, useRef } from 'react';
import type { VideoFields } from '../types';
import cx from '../utils/cx';
import { client } from '../utils/sanity-client';
import { usePlayInView } from '../utils/use-play-in-view';
import { useReducedMotion } from '../utils/use-reduced-motion';

const builder = imageUrlBuilder(client);

type VideoProps = {
	url: string;
	poster?: VideoFields['poster'];
	alt?: string | null;
	autoplay?: boolean;
	loading?: 'lazy' | 'eager';
	className?: string;
};

const Video: FC<VideoProps> = ({
	url,
	poster,
	alt,
	autoplay = true,
	loading = 'lazy',
	className = '',
}) => {
	const ref = useRef<HTMLVideoElement>(null);
	const reducedMotion = useReducedMotion();

	const aspectRatio =
		poster?.width && poster?.height
			? `${poster.width} / ${poster.height}`
			: '16 / 9';

	const posterUrl = poster?.asset
		? builder.image(poster.asset).width(1280).url()
		: undefined;

	const shouldAutoplay = autoplay && !reducedMotion;

	usePlayInView(ref, shouldAutoplay);

	return (
		<video
			ref={ref}
			className={cx('w-full h-auto', className)}
			style={{ aspectRatio }}
			src={url}
			poster={posterUrl}
			aria-label={alt || undefined}
			muted={shouldAutoplay}
			loop={shouldAutoplay}
			playsInline
			controls={!shouldAutoplay}
			preload={loading === 'eager' ? 'auto' : 'metadata'}
		/>
	);
};

export default Video;
