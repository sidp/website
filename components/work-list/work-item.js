import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { workProps } from '../prop-types';
import styles from './work-list.module.css';

const WorkItem = (props) => {
	const { title, year } = props.page;

	return (
		<div className={styles['work-item']}>
			<Link to={prefixLink(props.path)}>
				<div className={styles['image']} />
				<h3 className={styles['title']}>
					{title}
				</h3>
				<p className={styles['meta']}>{year}</p>
			</Link>
		</div>
	);
};

WorkItem.propTypes = {
	page: workProps.isRequired,
	path: PropTypes.string.isRequired,
};

export default WorkItem;
