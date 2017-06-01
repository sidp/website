import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import { projectProps } from '../prop-types';
import ParallaxImage from '../parallax-image';

import styles from './project-list.module.css';
import thumbs from '../../images/thumbs';

const ProjectItem = ({ page: { title, client, year, slug }, path }) => {
	let images = [];
	let flattened = '';

	if (slug && thumbs[slug]) {
		images = thumbs[slug].images;
		flattened = thumbs[slug].flattened;
	}

	return (
		<div className={styles['project-item']}>
			<Link to={path}>
				<ParallaxImage images={images} flattened={flattened} />
				<h3 className={styles['title']}>
					{title}
				</h3>
				<p className={styles['meta']}>
					{client}
				</p>
			</Link>
		</div>
	);
};

ProjectItem.propTypes = {
	page: projectProps.isRequired,
	path: PropTypes.string.isRequired,
};

export default ProjectItem;
