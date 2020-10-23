import * as React from 'react';
import styled from 'styled-components';
import { Image } from '../types';
import { srcSet } from '../utils/url';

type ProjectImageProps = {
	image: Image;
	className?: string;
};

const ProjectImage: React.FC<ProjectImageProps> = ({ image, className }) => {
	const [showImage, setShowImage] = React.useState(false);
	const [loadError, setLoadError] = React.useState(false);

	const imageElement = (
		<img
			src={image.url}
			sizes="100vw"
			srcSet={srcSet(image)}
			alt={image.alternativeText}
			style={{
				opacity: showImage ? 1 : 0,
			}}
			loading="lazy"
			onLoad={() => {
				setLoadError(false);
				setShowImage(true);
			}}
			onError={() => {
				setLoadError(true);
			}}
		/>
	);

	const wrapperStyle = {
		paddingTop: `${(image.height / image.width) * 100}%`,
		backgroundImage: `url(${image})`,
	};

	return (
		<Wrapper error={loadError} style={wrapperStyle} className={className}>
			{imageElement}
		</Wrapper>
	);
};

export default ProjectImage;

/**
 * Styled components
 */

const Wrapper = styled.div<{ error: boolean }>`
	position: relative;
	width: 100%;
	height: 0;
	background-size: 100%;

	& > img {
		position: absolute;
		top: 0;
		z-index: 3;
		width: 100%;
		height: 100%;
		transition: opacity 350ms linear;
	}

	/* overlay on error */
	&::before {
		content: '';
		display: none;
		background-color: #eee;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		opacity: 0;
		transition: opacity 400ms linear;

		${(props) =>
			props.error
				? `
					display: block;
					opacity: 0.66;
				`
				: ''};
	}
`;
