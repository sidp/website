'use client';

import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
import { type FC, useEffect, useRef, useState } from 'react';
import type { ImageFields } from '../../types';
import cx from '../../utils/cx';
import { client } from '../../utils/sanity-client';
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
	const [motionOk, setMotionOk] = useState(false);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		setMotionOk(!query.matches);

		const onChange = (event: MediaQueryListEvent) =>
			setMotionOk(!event.matches);
		query.addEventListener('change', onChange);

		return () => query.removeEventListener('change', onChange);
	}, []);

	useEffect(() => {
		const video = ref.current;

		if (!video || !motionOk) {
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
	}, [motionOk]);

	if (!motionOk) {
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
