import * as React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import { Navigation, Project } from '../../types';
import Meta from '../../components/meta';
import ExternalLink from '../../components/external-link';
import VideoEmbed from '../../components/video-embed';
import ProjectList from '../../components/project-list';
import { TextWrapper } from '../../styles/components';
import { imageBoxShadow, cubicBezierFadeIn } from '../../styles/variables';
import apiGet from '../../utils/api';
import markdown from '../../utils/markdown';
import { useRouter } from 'next/router';
import ErrorPage404 from '../404';
import Header from '../../components/header';
import NextImage from 'next/image';
import { uploadUrl } from '../../utils/url';

type ProjectPageProps = {
	navigation: Navigation;
	project: Project | null;
	projects: Project[];
};

const ProjectPage: React.FC<ProjectPageProps> = ({
	navigation,
	project,
	projects,
}) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!project) {
		return <ErrorPage404 />;
	}

	return (
		<>
			<Head>
				<title>{project.title}</title>
				{project.description && (
					<meta name="description" content={project.description} />
				)}
			</Head>
			<Header navigation={navigation} />
			<Article key="article">
				<TextWrapper className="h-entry">
					<header>
						<Title className="p-name">{project.title}</Title>
						<Meta
							agency={project.agency}
							client={project.client}
							year={project.year}
							link={project.link}
						/>
					</header>
					<div
						dangerouslySetInnerHTML={{ __html: project.body }}
						className="e-content"
					/>
					{project.link && (
						<Links>
							<StyledLink href={project.link}>See it live</StyledLink>
						</Links>
					)}
					{project.videoEmbed && <StyledVideoEmbed {...project.videoEmbed} />}
				</TextWrapper>
				{project.images && project.images.length > 0 && (
					<Images>
						{project.images.map((image) => (
							<StyledImage key={image.id}>
								<NextImage
									src={uploadUrl(image.url)}
									width={image.width}
									height={image.height}
									alt={image.alternativeText}
								/>
							</StyledImage>
						))}
					</Images>
				)}
			</Article>
			<ProjectList
				title="More Projects"
				projects={projects}
				key="project-list"
			/>
		</>
	);
};

export default ProjectPage;

export const getStaticProps: GetStaticProps<ProjectPageProps> = async (ctx) => {
	const [navigation, singleProject, projects] = await Promise.all([
		apiGet<Navigation>('navigation'),
		apiGet<Project[]>('projects', {
			slug: ctx.params.slug,
			_limit: 1,
		}),
		apiGet<Project[]>('projects', {
			slug_ne: ctx.params.slug,
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	const project = singleProject && singleProject[0] ? singleProject[0] : null;
	if (!project) {
		return {
			props: {
				navigation,
				project: null,
				projects,
			},
			revalidate: 1,
		};
	}

	if (typeof project.body === 'string') {
		project.body = markdown(project.body);
	}

	return {
		props: {
			navigation,
			project,
			projects,
		},
		revalidate: 5,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects = await apiGet<Project[]>('projects');

	return {
		paths: projects.map((project) => ({ params: { slug: project.slug } })),
		fallback: true,
	};
};

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
	border-top: 1px solid var(--accent-color);
	margin-top: 2em;
	padding-top: 0.5em;
`;

const StyledLink = styled(ExternalLink)`
	color: var(--link-color);
	position: relative;
	padding-right: 0.1em;
	font-family: var(--sans-serif-font-family);

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

const StyledImage = styled.div`
	margin: 1.2rem 0;
	transition: margin 100ms ease-out;
	box-shadow: ${imageBoxShadow};

	@media (min-width: 639px) {
		margin: 1.8rem 0;
	}
`;
