import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import ParallaxImage from '../parallax-image';
import { projectProps } from '../prop-types';
import styles from './project-list.module.css';
import thumbs from '../../thumbs';

const ProjectItem = (props) => {
	const { project, client, year, slug } = props.page;

	let images = [];
	let flattened = '';
	if (slug && thumbs[slug]) {
		images = thumbs[slug].images;
		flattened = thumbs[slug].flattened;
	}

	return (
		<div className={styles['project-item']}>
			<Link to={prefixLink(props.path)}>
				<ParallaxImage images={images} flattened={flattened} />
				<h3 className={styles['title']}>
					{project}
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