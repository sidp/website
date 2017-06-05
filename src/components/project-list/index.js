import React from 'react';
import PropTypes from 'prop-types';

import { projectProps } from '../prop-types';
import ProjectItem from './project-item';

import styles from './project-list.module.css';

const ProjectList = ({ title = '', projects = [], exclude = '' }) => {
	projects = projects.filter(project => project.path !== exclude);

	return (
		<div>
			{title && <h2 className={styles['title']}>{title}</h2>}
			<div className={styles['project-list']}>
				{projects.map(item => <ProjectItem project={item} />)}
			</div>
		</div>
	);
};

ProjectList.propTypes = {
	title: PropTypes.string,
	projects: PropTypes.arrayOf(PropTypes.object),
	exclude: PropTypes.string,
};

export default ProjectList;
