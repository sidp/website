import React from 'react';
import cx from '../utils/cx';

type VideoEmbedProps = {
	url: string;
	width?: number;
	height?: number;
	title?: string;
	className?: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({
	url,
	width = 1920,
	height = 1080,
	title,
	className = '',
}) => {
	return (
		<iframe
			className={cx('w-full h-auto', className)}
			style={{ aspectRatio: `${width} / ${height}` }}
			src={url}
			title={title}
			width={width}
			height={height}
			allow="autoplay; fullscreen; picture-in-picture"
			allowFullScreen
			loading="lazy"
		/>
	);
};

export default VideoEmbed;
