import React, { PropTypes } from 'react';

const ExternalLink = ({ to, children, ...props }) => (
	<a {...props} href={to} target="_blank" rel="noopener">
		{children}
	</a>
);

ExternalLink.propTypes = {
	to: PropTypes.string.isRequired,
};

export default ExternalLink;
