import React, { Component } from 'react';
import WorkItem from './work-item';

import styles from './work-list.module.css';

const WorkList = (props) => (
	<div className={styles['work-list']}>
		{props.work.map(item =>
			<WorkItem
				path={item.path}
				page={item.data}
				key={item.path}
			/>
		)}
	</div>
);

export default WorkList;
