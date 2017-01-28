import { PropTypes } from 'react';

export const pageProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
});

export const workProps = PropTypes.shape({
	title: PropTypes.string.isRequired,
	year: PropTypes.string,
	client: PropTypes.string,
	project: PropTypes.string,
});
