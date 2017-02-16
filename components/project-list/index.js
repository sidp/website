import React, { Component, PropTypes } from 'react';
import ProjectItem from './project-item';
import { projectProps } from '../prop-types';

import styles from './project-list.module.css';

const ProjectList = (props) => (
	<div className={styles['project-list']}>
		{props.projects.map(item =>
			<ProjectItem
				path={item.path}
				page={item.data}
				key={item.path}
			/>
		)}
	</div>
);

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		path: PropTypes.string,
		data: projectProps,
	})),
};

ProjectList.defaultProps = {
	projects: [],
};

export default ProjectList;
