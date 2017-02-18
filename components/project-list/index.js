import React, { Component, PropTypes } from 'react';
import ProjectItem from './project-item';
import { projectProps } from '../prop-types';

import styles from './project-list.module.css';

const ProjectList = (props) => {
	const projects = props.projects.filter(
		project => project.path !== props.exclude
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

ProjectList.defaultProps = {
	projects: [],
	exclude: '',
};

export default ProjectList;
