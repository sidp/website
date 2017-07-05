import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { projectProps } from '../prop-types';
import Meta from './meta';
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

	const meta = [];
	if (frontmatter.description) {
		meta.push(
			<meta
				name="description"
				content="frontmatter.description"
				key="description"
			/>
		);
	}

	let images = [];
	if (frontmatter.images && frontmatter.images.childrenManifestJson) {
		images = frontmatter.images.childrenManifestJson.map(manifestItem => {
			return {
				...manifestItem.image.childImageSharp.responsive,
				title: manifestItem.title,
			};
		});
	}

	return (
		<article className={styles['project']}>
			<Helmet>
				<title>
					{frontmatter.title}
				</title>
				{meta}
			</Helmet>
			<div className={`markdown ${utils['text-wrapper']}`}>
				<header>
					<h1 className={styles['title']}>
						{frontmatter.title}
					</h1>
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
				{images &&
					images.map(image =>
						<ProjectImage
							image={image}
							className={styles['image']}
							key={image.src}
						/>
					)}
			</div>
		</article>
	);
};

export default Project;

export const projectDetailsFragment = graphql`
	fragment Project_details on MarkdownRemark {
		frontmatter {
			title
			agency
			client
			year
			link
			description
			videoEmbed {
				url
				width
				height
			}
			images {
				childrenManifestJson {
					title
					image {
						childImageSharp {
							responsive: responsiveSizes(maxWidth: 640) {
								src
								srcSet
								base64
							}
						}
					}
				}
			}
		}
		fields {
			slug
		}
		html
	}
`;
