import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = ({ to, rel = '', children, ...props }) => (
	// eslint-disable-next-line react/jsx-no-target-blank
	<a {...props} href={to} target="_blank" rel={`noopener noreferrer ${rel}`}>
		{children}
	</a>
);

ExternalLink.propTypes = {
	to: PropTypes.string.isRequired,
};

export default ExternalLink;
