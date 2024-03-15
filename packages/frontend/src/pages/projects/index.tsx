import * as React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Navigation, Project } from '../../types';
import { absoluteUrl } from '../../utils/url';
import apiGet from '../../utils/api';
import title from '../../utils/title';
import Header from '../../components/header';
import ProjectList from '../../components/project-list';

type ProjectIndexProps = {
	navigation: Navigation;
	projects: Project[];
};

const ProjectIndex: React.FC<ProjectIndexProps> = ({
	navigation,
	projects,
}) => {
	return (
		<>
			<Head>
				<title>{title('Projects')}</title>
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={absoluteUrl('/projects')} />
			</Head>
			<Header navigation={navigation} />
			<ProjectList projects={projects} />
		</>
	);
};

export default ProjectIndex;

export const getStaticProps: GetStaticProps<ProjectIndexProps> = async (
	ctx,
) => {
	const [navigation, projects] = await Promise.all([
		apiGet<Navigation>('navigation'),
		apiGet<Project[]>('projects', {
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	return {
		props: {
			navigation,
			projects,
		},
		revalidate: 5,
	};
};
