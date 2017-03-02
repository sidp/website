import React, { Component, PropTypes } from 'react';

import { projectProps } from '../prop-types';
import ProjectItem from './project-item';

import styles from './project-list.module.css';

const ProjectList = ({ projects = [], exclude = '' }) => {
	projects = projects.filter(
		project => project.path !== exclude
	);

	return (
		<div className={styles['project-list']}>
			{projects.map(item =>
				<ProjectItem
					path={item.path}
					page={item.data}
					key={item.path}
				/>
			)}
		</div>
	);
};

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string,
		data: projectProps,
	})),
	exclude: PropTypes.string,
};

export default ProjectList;
