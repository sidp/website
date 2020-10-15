import * as React from 'react';
import Head from 'next/head';
import { absoluteUrl } from '../../utils/url';
import ProjectList from '../../components/project-list';
import { Project } from '../../types';
import { GetStaticProps } from 'next';
import apiGet from '../../utils/api';

type ProjectIndexProps = {
	projects: Project[];
};

const ProjectIndex: React.FC<ProjectIndexProps> = ({ projects }) => {
	return (
		<>
			<Head>
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
			</Head>
			<ProjectList projects={projects} />
		</>
	);
};

export default ProjectIndex;

export const getStaticProps: GetStaticProps<ProjectIndexProps> = async (
	ctx
) => {
	const projects = await apiGet<Project[]>('projects', {
		_sort: 'created_at:DESC',
		_limit: 16,
	});

	return {
		props: {
			projects,
		},
		revalidate: 5,
	};
};
