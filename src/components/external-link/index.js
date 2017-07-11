import React from 'react';
import PropTypes from 'prop-types';

const ExternalLink = ({ to, children, ...props }) =>
	<a {...props} href={to} target="_blank" rel="noopener">
		{children}
	</a>;

ExternalLink.propTypes = {
	to: PropTypes.string.isRequired,
};

export default ExternalLink;
