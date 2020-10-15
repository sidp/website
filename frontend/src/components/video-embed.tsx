import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type VideoEmbedProps = {
	url: string;
	title: string;
	width: number;
	height: number;
	className?: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({
	url,
	title,
	width,
	height,
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
			/>
		</Block>
	);
};

VideoEmbed.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	className: PropTypes.string,
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
