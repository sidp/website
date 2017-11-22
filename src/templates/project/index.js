import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Meta from '../../components/meta';
import ExternalLink from '../../components/external-link';
import ProjectImage from '../../components/project-image';
import VideoEmbed from '../../components/video-embed';
import ProjectList from '../../components/project-list';

import utils from '../../css/utils.module.css';
import styles from './project.module.css';

export default class Project extends Component {
	renderMeta(frontmatter) {
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
		return meta;
	}

	renderLink(frontmatter) {
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
		return link;
	}

	renderVideoEmbed(frontmatter) {
		let videoEmbed;
		if (frontmatter.videoEmbed) {
			videoEmbed = (
				<VideoEmbed
					{...frontmatter.videoEmbed}
					className={styles['video-embed']}
				/>
			);
		}
		return videoEmbed;
	}

	renderImages(frontmatter) {
		let images = [];
		let imageElements;

		if (frontmatter.images && frontmatter.images.length > 0) {
			images = frontmatter.images.map(image => ({
				...image.src.childImageSharp.responsive,
				title: image.title,
			}));
		}

		if (images) {
			imageElements = (
				<div className={styles['images']}>
					{images.map(image => (
						<ProjectImage
							image={image}
							className={styles['image']}
							key={image.src}
						/>
					))}
				</div>
			);
		}

		return imageElements;
	}

	render() {
		const {
			data: { markdownRemark: page, allMarkdownRemark: { edges } },
		} = this.props;
		const projects = edges.map(edge => edge.node);
		const frontmatter = page.frontmatter;

		const meta = this.renderMeta(frontmatter);
		const link = this.renderLink(frontmatter);
		const videoEmbed = this.renderVideoEmbed(frontmatter);
		const images = this.renderImages(frontmatter);

		return (
			<div>
				<article className={styles['project']}>
					<Helmet>
						<title>{frontmatter.title}</title>
						{meta}
					</Helmet>
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
						<div dangerouslySetInnerHTML={{ __html: page.html }} />
						{link}
						{videoEmbed}
					</div>
					{images}
				</article>
				<ProjectList title="More Projects" projects={projects} />
			</div>
		);
	}
}

export const pageQuery = graphql`
	query ProjectBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
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
					title
					src {
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
			fields {
				slug
			}
			html
		}
		allMarkdownRemark(
			filter: { fields: { type: { eq: "project" }, slug: { ne: $slug } } }
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}
	}
`;
