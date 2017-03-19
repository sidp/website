import { PropTypes } from 'react';

export const pageProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	heading: PropTypes.string,
	description: PropTypes.string,
});

export const imageProps = PropTypes.shape({
	title: PropTypes.string,
	src2x: PropTypes.string,
	src1x: PropTypes.string,
	src0x: PropTypes.string,
});

export const projectProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	agency: PropTypes.string,
	client: PropTypes.string,
	year: PropTypes.string,
	description: PropTypes.string,
	link: PropTypes.string,
	slug: PropTypes.string,
	images: PropTypes.arrayOf(imageProps),
	videoEmbed: PropTypes.shape({
		url: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}),
});
