import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../../utils/page-title';
import { projectProps } from '../prop-types';
import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './project.module.css';

const Project = props => {
	let link;

	if (props.page.link) {
		link = (
			<p>
				<ExternalLink
					to={props.page.link}
					className={styles['visit-link']}
				>
					Check it out
				</ExternalLink>
			</p>
		);
	}

	return (
		<div className={styles['project']}>
			<Helmet title={pageTitle(props.page)} />
			<div className={`markdown ${utils['text-wrapper']} ${styles['description']}`}>
				<h1 className={styles['title']}>{props.page.title}</h1>
				<Meta
					client={props.page.client}
					year={props.page.year}
					link={props.page.link}
				/>
				<div dangerouslySetInnerHTML={{ __html: props.page.body }} />
				{link}
			</div>
			(pictures)
		</div>
	);
};

Project.propTypes = {
	page: projectProps.isRequired,
};

export default Project;


const Meta = (props) => {
	const items = [];

	if (props.client) {
		items.push(<MetaItem key="client" label="Client" value={props.client} />);
	}

	if (props.year) {
		items.push(<MetaItem key="year" label="Year" value={props.year} />);
	}

	if (props.link) {
		const value = props.link.replace(/^https?\:\/\/(www\.)?([^\/]+).*$/, '$2');
		items.push(<MetaItem key="link" label="Link" value={value} link={props.link} />);
	}

	return <div className={styles['meta']}>{items}</div>;
};

Meta.propTypes = {
	client: PropTypes.string,
	year: PropTypes.string,
};

Meta.defaultProps = {
	client: '',
	year: '',
};

const MetaItem = (props) => {
	let value;

	if (props.link) {
		value = (
			<ExternalLink
				to={props.link}
				className={styles['meta-value']}
			>
				{props.value}
			</ExternalLink>
		);
	} else {
		value = (
			<span className={styles['meta-value']}>
				{props.value}
			</span>
		);
	}

	return (
		<span className={styles['meta-item']}>
			<span className={styles['meta-label']}>{props.label}:</span>
			{' '}
			{value}
		</span>
	);
};
