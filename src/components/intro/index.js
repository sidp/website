import React from 'react';
import ExternalLink from '../external-link';
import styles from './intro.module.css';

const Intro = ({}) => {
	return (
		<div className={styles['block']}>
			<p>
				Hi! I’m a freelance web developer and designer in Stockholm, Sweden.
				Have a look at some of the most popular project I’ve worked on below,
				and <a href="mailto:peter@simonsson.com">contact me</a> if you want to
				talk further.
			</p>
		</div>
	);
};

export default Intro;
