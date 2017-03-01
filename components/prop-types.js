import { PropTypes } from 'react';

export const pageProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
});

export const projectProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	year: PropTypes.string,
	client: PropTypes.string,
	project: PropTypes.string,
	link: PropTypes.string,
	slug: PropTypes.string,
});
