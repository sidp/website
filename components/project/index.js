import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import pageTitle from '../../utils/page-title';
import { projectProps } from '../prop-types';
import ExternalLink from '../external-link';
import ProjectImage from '../project-image';
import VideoEmbed from '../video-embed';

import utils from '../../css/utils.module.css';
import styles from './project.module.css';

const Project = ({ page }) => {
	let link;

	if (page.link) {
		link = (
			<p className={styles['links']}>
				<ExternalLink to={page.link} className={styles['link']}>
					See it live
				</ExternalLink>
			</p>
		);
	}

	let videoEmbed;
	if (page.videoEmbed) {
		videoEmbed = (
			<VideoEmbed {...page.videoEmbed} className={styles['video-embed']} />
		);
	}

	const helmetMeta = [];
	if (page.description) {
		helmetMeta.push({
			name: 'description',
			content: page.description,
		});
	}

	return (
		<article className={styles['project']}>
			<Helmet title={pageTitle(page)} meta={helmetMeta} />
			<div className={`markdown ${utils['text-wrapper']}`}>
				<header>
					<h1 className={styles['title']}>{page.title}</h1>
					<Meta
						agency={page.agency}
						client={page.client}
						year={page.year}
						link={page.link}
					/>
				</header>
				<div dangerouslySetInnerHTML={{ __html: page.body }} />
				{link}
				{videoEmbed}
			</div>
			<div className={styles['images']}>
				{page.images &&
					page.images.map(image => (
						<ProjectImage
							image={image}
							className={styles['image']}
							key={image.src1x}
						/>
					))}
			</div>
		</article>
	);
};

Project.propTypes = {
	page: projectProps.isRequired,
};

export default Project;

const Meta = ({ agency = '', client = '', year = '', link = '' }) => {
	const items = [];

	if (agency) {
		items.push(<MetaItem key="agency" label="Agency" value={agency} />);
	}

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
	agency: PropTypes.string,
	client: PropTypes.string,
	year: PropTypes.string,
	link: PropTypes.string,
};

const MetaItem = ({ label, value, link = '' }) => {
	let valueElement;

	if (link) {
		valueElement = (
			<ExternalLink to={link} className={styles['meta-value']}>
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
