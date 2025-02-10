import type { Metadata } from 'next';
import { defineQuery } from 'next-sanity';
import { notFound } from 'next/navigation';
import PostsList from '../../components/posts-list';
import { client } from '../../utils/sanity-client';
import { postFields } from '../../utils/sanity-data';
import { fetchOptions } from '../../utils/sanity-fetch';

export const metadata: Metadata = {
	title: 'Projects',
	alternates: {
		canonical: '/projects',
	},
};

export default async function ProjectsPage() {
	const projectsPageQuery = defineQuery(`
		*[_type == "post" && type == "project"] | order(meta.date desc, _createdAt desc) {
			${postFields}
		}
	`);

	const projects = await client.fetch(
		projectsPageQuery,
		undefined,
		await fetchOptions({
			tags: ['post'],
		}),
	);

	if (!projects || projects.length === 0) {
		notFound();
	}

	return <PostsList title="Projects" posts={projects} priorityImageLoading />;
}
