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

const Project = ({ page: { frontmatter, html } }) => {
	let link;

	if (frontmatter.link) {
		link = (
			<p className={styles['links']}>
				<ExternalLink to={frontmatter.link} className={styles['link']}>
					See it live
				</ExternalLink>
			</p>
		);
	}

	let videoEmbed;
	if (frontmatter.videoEmbed) {
		videoEmbed = (
			<VideoEmbed
				{...frontmatter.videoEmbed}
				className={styles['video-embed']}
			/>
		);
	}

	const helmetMeta = [];
	if (frontmatter.description) {
		helmetMeta.push({
			name: 'description',
			content: frontmatter.description,
		});
	}

	return (
		<article className={styles['project']}>
			<Helmet title={pageTitle(frontmatter)} meta={helmetMeta} />
			<div className={`markdown ${utils['text-wrapper']}`}>
				<header>
					<h1 className={styles['title']}>{frontmatter.title}</h1>
					<Meta
						agency={frontmatter.agency}
						client={frontmatter.client}
						year={frontmatter.year}
						link={frontmatter.link}
					/>
				</header>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				{link}
				{videoEmbed}
			</div>
			<div className={styles['images']}>
				{frontmatter.images &&
					frontmatter.images.map(image => (
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

export default Project;

export const projectDetailsFragment = graphql`
	fragment Project_details on MarkdownRemark {
		frontmatter {
			title,
			agency,
			client,
			year,
			link,
			description,
			videoEmbed {
				url,
				width,
				height
			}
		}
		fields {
			slug
		}
		html
	}
`;

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
