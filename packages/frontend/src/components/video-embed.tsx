import React from 'react';
import styled from 'styled-components';

type VideoEmbedProps = {
	url: string;
	width: number;
	height: number;
	title?: string;
	className?: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({
	url,
	width,
	height,
	title,
	className = '',
}) => {
	const aspectRatio = height / width;
	const style = {
		paddingTop: `${aspectRatio * 100}%`,
	};

	return (
		<Block className={className} style={style}>
			<iframe
				src={url}
				title={title}
				width={width}
				height={height}
				scrolling="no"
				frameBorder="0"
				allowFullScreen
				loading="lazy"
			/>
		</Block>
	);
};

export default VideoEmbed;

/**
 * Styled components
 */

const Block = styled.div`
	position: relative;
	overflow: hidden;
	padding: 0;
	width: 100%;

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;
