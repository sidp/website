import React from 'react';
import PropTypes from 'prop-types';

import styles from './video-embed.module.css';

const VideoEmbed = ({ url, title, width, height, className = '' }) => {
	const aspectRatio = height / width;
	const classNames = `${styles['video-embed']} ${className}`;
	const style = {
		paddingTop: `${aspectRatio * 100}%`,
	};

	return (
		<div className={classNames} style={style}>
			<iframe
				src={url}
				title={title}
				width={width}
				height={height}
				scrolling="no"
				frameBorder="0"
				allowTransparency
				allowFullScreen
			/>
		</div>
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
