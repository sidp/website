import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import pageTitle from '../../utils/page-title';
import { projectProps } from '../prop-types';
import ExternalLink from '../external-link';

import utils from '../../css/utils.module.css';
import styles from './project.module.css';

const Project = ({ page }) => {
	let link;

	if (page.link) {
		link = (
			<p>
				<ExternalLink
					to={page.link}
					className={styles['visit-link']}
				>
					See it live
				</ExternalLink>
			</p>
		);
	}

	return (
		<div className={styles['project']}>
			<Helmet title={pageTitle(page)} />
			<div className={`markdown ${utils['text-wrapper']} ${styles['description']}`}>
				<h1 className={styles['title']}>{page.title}</h1>
				<Meta
					client={page.client}
					year={page.year}
					link={page.link}
				/>
				<div dangerouslySetInnerHTML={{ __html: page.body }} />
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


const Meta = ({ client = '', year = '', link = '' }) => {
	const items = [];

	if (client) {
		items.push(<MetaItem key="client" label="Client" value={client} />);
	}

	if (year) {
		items.push(<MetaItem key="year" label="Year" value={year} />);
	}

	if (link) {
		const value = link.replace(/^https?\:\/\/(www\.)?([^\/]+).*$/, '$2');
		items.push(<MetaItem key="link" label="Link" value={value} link={link} />);
	}

	return <div className={styles['meta']}>{items}</div>;
};

Meta.propTypes = {
	client: PropTypes.string,
	year: PropTypes.string,
	link: PropTypes.string,
};


const MetaItem = ({ label, value, link = '' }) => {
	let valueElement;

	if (link) {
		valueElement = (
			<ExternalLink
				to={link}
				className={styles['meta-value']}
			>
				{value}
			</ExternalLink>
		);
	} else {
		valueElement = (
			<span className={styles['meta-value']}>
				{value}
			</span>
		);
	}

	return (
		<span className={styles['meta-item']}>
			<span className={styles['meta-label']}>{label}:</span>
			{' '}
			{valueElement}
		</span>
	);
};

MetaItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	link: PropTypes.string,
};
