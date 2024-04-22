import * as React from 'react';
import { Metadata } from 'next';
import { Project } from '../../types';
import { fetch } from '../../utils/sanity-fetch';
import { postFields } from '../../utils/sanity-data';
import PostsList from '../../components/posts-list';

export const metadata: Metadata = {
	title: 'Projects',
	alternates: {
		canonical: '/projects',
	},
};

export default async function ProjectsPage() {
	const projects = await fetch<Project[]>({
		draftMode: false,
		query: `*[_type == "post" && type == "project"] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
	});

	return <>{projects && <PostsList title="Projects" posts={projects} />}</>;
}
