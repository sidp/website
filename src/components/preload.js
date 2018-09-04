import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function Preload({ images = [], images1x = [], images2x = [] }) {
	const baseProps = { rel: 'preload', as: 'image' };
	const removeData = src => !src.match(/^data:/);
	const mapper = (media = 'all') => src => (
		<link {...baseProps} href={src} media={media} key={src} />
	);
	return (
		<Helmet>
			{images.filter(removeData).map(mapper())}
			{images1x.filter(removeData).map(mapper('(max-resolution: 144dpi)'))}
			{images2x.filter(removeData).map(mapper('(min-resolution: 144dpi)'))}
		</Helmet>
	);
}

Preload.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string),
	images1x: PropTypes.arrayOf(PropTypes.string),
	images2x: PropTypes.arrayOf(PropTypes.string),
};
