'use client';

import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import { type FC, useEffect, useRef, useState } from 'react';
import type { VideoFields } from '../types';
import cx from '../utils/cx';
import { client } from '../utils/sanity-client';

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
	const [reducedMotion, setReducedMotion] = useState(false);

	const aspectRatio =
		poster?.width && poster?.height
			? `${poster.width} / ${poster.height}`
			: '16 / 9';

	const posterUrl = poster?.asset
		? builder.image(poster.asset).width(1920).url()
		: undefined;

	const shouldAutoplay = autoplay && !reducedMotion;

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(query.matches);

		const onChange = (event: MediaQueryListEvent) =>
			setReducedMotion(event.matches);
		query.addEventListener('change', onChange);

		return () => query.removeEventListener('change', onChange);
	}, []);

	useEffect(() => {
		const video = ref.current;

		if (!video) {
			return;
		}

		if (!shouldAutoplay) {
			video.pause();
			return;
		}

		video.muted = true;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) {
					return;
				}

				if (entry.isIntersecting) {
					video.play().catch(() => {});
				} else {
					video.pause();
				}
			},
			{ threshold: 0 },
		);

		observer.observe(video);

		return () => observer.disconnect();
	}, [shouldAutoplay]);

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
