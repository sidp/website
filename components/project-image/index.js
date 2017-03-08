import React from 'react';
import { imageProps } from '../prop-types';

const ProjectImage = ({ image }) => {
	const src1x = require(`../../images/${image.src1x}`);
	const src2x = require(`../../images/${image.src2x}`);

	return (
		<img src={src1x} sizes="100vw" srcSet={`${src2x} 1280w, ${src2x} 2560w`} alt={image.title} />
	);
};

ProjectImage.propTypes = {
	image: imageProps.isRequired,
};

export default ProjectImage;
