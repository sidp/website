import * as React from 'react';
import Head from 'next/head';
import { absoluteUrl } from '../../utils/url';
import ProjectList from '../../components/project-list';
import { Navigation, Project } from '../../types';
import { GetStaticProps } from 'next';
import apiGet from '../../utils/api';
import Header from '../../components/header';

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
	ctx
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
