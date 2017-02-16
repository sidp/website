import React from 'react';
import { workProps } from '../prop-types';
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
	post: workProps.isRequired,
};

export default Project;
