import { PropTypes } from 'react';

export const pageProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
});

export const imageProps = PropTypes.shape({
	title: PropTypes.string,
	src2x: PropTypes.string,
	src1x: PropTypes.string,
	src0x: PropTypes.string,
});

export const projectProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	year: PropTypes.string,
	client: PropTypes.string,
	project: PropTypes.string,
	link: PropTypes.string,
	slug: PropTypes.string,
	images: PropTypes.arrayOf(imageProps),
});
