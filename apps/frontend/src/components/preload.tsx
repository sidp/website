import React from 'react';
import Head from 'next/head';

type PreloadProps = {
	images?: string[];
	images1x?: string[];
	images2x?: string[];
};

const Preload: React.FC<PreloadProps> = ({
	images = [],
	images1x = [],
	images2x = [],
}) => {
	const baseProps = { rel: 'preload', as: 'image' };
	const removeData = (src: string) => !src.match(/^data:/);
	const mapper =
		(media = 'all') =>
		(src: string) =>
			<link {...baseProps} href={src} media={media} key={src} />;
	return (
		<Head>
			{images.filter(removeData).map(mapper())}
			{images1x.filter(removeData).map(mapper('(max-resolution: 144dpi)'))}
			{images2x.filter(removeData).map(mapper('(min-resolution: 144dpi)'))}
		</Head>
	);
};

export default Preload;
