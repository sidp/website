import React from 'react';
import { projectProps } from '../prop-types';
import utils from '../../css/utils.module.css';
import styles from './project.module.css';

const Project = props => (
	<div className={styles['project']}>
		<div className={`markdown ${utils['text-wrapper']}`}>
			<h1>{props.post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: props.post.body }} />
		</div>
	</div>
);

Project.propTypes = {
	post: projectProps.isRequired,
};

export default Project;
