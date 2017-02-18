import React, { PropTypes } from 'react';

const ExternalLink = ({ children, ...props }) => (
	<a {...props} target="_blank" rel="noopener">
		{children}
	</a>
);

ExternalLink.propTypes = {
	href: PropTypes.string.isRequired,
};

export default ExternalLink;
