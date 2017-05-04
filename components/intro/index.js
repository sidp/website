import React from 'react';
import ExternalLink from '../external-link';
import styles from './intro.module.css';

const Intro = ({}) => {
	return (
		<div className={styles['block']}>
			<p>
				Hi! I'm the Technical Director of the PR agency
				{' '}
				<ExternalLink to="http://wenderfalck.com/">Wenderfalck</ExternalLink>
				{' '}
				in Stockholm, Sweden. This is a selection of the most popular projects I've worked on. Have a look!
			</p>
		</div>
	);
};

export default Intro;
