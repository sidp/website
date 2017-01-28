import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { pageProps } from '../prop-types';

const WorkItem = (props) => {
	const { title } = props.page;

	return (
		<div>
			<Link to={prefixLink(props.path)}>{title}</Link>
		</div>
	);
};

WorkItem.propTypes = {
	page: pageProps.isRequired,
	path: PropTypes.string.isRequired,
};

export default WorkItem;
