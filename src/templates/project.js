import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Meta from '../components/meta';
import ExternalLink from '../components/external-link';
import ProjectImage from '../components/project-image';
import VideoEmbed from '../components/video-embed';
import ProjectList from '../components/project-list';
import { TextWrapper } from '../styles/components';
import {
	accentColor,
	linkColor,
	sansSerifFontFamily,
	imageBoxShadow,
	cubicBezierFadeIn,
} from '../styles/variables';

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
				<Links>
					<StyledLink to={frontmatter.link}>See it live</StyledLink>
				</Links>
			);
		}
		return link;
	}

	renderVideoEmbed(frontmatter) {
		let videoEmbed;
		if (frontmatter.videoEmbed) {
			videoEmbed = <StyledVideoEmbed {...frontmatter.videoEmbed} />;
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
				<Images>
					{images.map(image => (
						<StyledProjectImage image={image} key={image.src} />
					))}
				</Images>
			);
		}

		return imageElements;
	}

	render() {
		const {
			data: {
				markdownRemark: page,
				allMarkdownRemark: { edges },
			},
		} = this.props;
		const projects = edges.map(edge => edge.node);
		const frontmatter = page.frontmatter;

		const meta = this.renderMeta(frontmatter);
		const link = this.renderLink(frontmatter);
		const videoEmbed = this.renderVideoEmbed(frontmatter);
		const images = this.renderImages(frontmatter);

		return (
			<>
				<Article key="article">
					<Helmet>
						<title>{frontmatter.title}</title>
						{meta}
					</Helmet>
					<TextWrapper className="h-entry">
						<header>
							<Title className="p-name">{frontmatter.title}</Title>
							<Meta
								agency={frontmatter.agency}
								client={frontmatter.client}
								year={frontmatter.year}
								link={frontmatter.link}
							/>
						</header>
						<div
							dangerouslySetInnerHTML={{ __html: page.html }}
							className="e-content"
						/>
						{link}
						{videoEmbed}
					</TextWrapper>
					{images}
				</Article>
				<ProjectList
					title="More Projects"
					projects={projects}
					key="project-list"
				/>
			</>
		);
	}
}

/**
 * GraphQL
 */

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
			filter: {
				fields: { type: { eq: "project" }, slug: { ne: $slug } }
				frontmatter: { draft: { ne: true } }
			}
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

/**
 * Styled components
 */

const Article = styled.article`
	animation: fadeIn 400ms ${cubicBezierFadeIn} both;
`;

const Title = styled.h1`
	margin-bottom: 0;
`;

const Links = styled.p`
	border-top: 1px solid ${accentColor};
	margin-top: 2em;
	padding-top: 0.5em;
`;

const StyledLink = styled(ExternalLink)`
	color: ${linkColor};
	position: relative;
	padding-right: 0.1em;
	font-family: ${sansSerifFontFamily};

	&::after {
		content: '→';
		position: absolute;
		top: -0.1em;
		right: -1.1em;
	}
`;

const StyledVideoEmbed = styled(VideoEmbed)`
	margin-top: 2.4rem;
	margin-bottom: 2.4rem;
`;

const Images = styled.div`
	margin-bottom: 4.5rem;
`;

const StyledProjectImage = styled(ProjectImage)`
	margin: 1.2rem 0;
	transition: margin 100ms ease-out;
	box-shadow: ${imageBoxShadow};

	@media (min-width: 639px) {
		margin: 1.8rem 0;
	}
`;
