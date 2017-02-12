import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import ParallaxImage from '../parallax-image';
import { workProps } from '../prop-types';
import styles from './work-list.module.css';
import thumbs from '../../thumbs';

const WorkItem = (props) => {
	const { project, client, year, slug } = props.page;

	let images = [];
	let flattened = '';
	if (slug && thumbs[slug]) {
		images = thumbs[slug].images;
		flattened = thumbs[slug].flattened;
	}

	return (
		<div className={styles['work-item']}>
			<Link to={prefixLink(props.path)}>
				<ParallaxImage images={images} flattened={flattened} />
				<h3 className={styles['title']}>
					{project}
				</h3>
				<p className={styles['meta']}>
					{client} {year ? `(${year})` : ''}
				</p>
			</Link>
		</div>
	);
};

WorkItem.propTypes = {
	page: workProps.isRequired,
	path: PropTypes.string.isRequired,
};

export default WorkItem;
