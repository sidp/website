import * as React from 'react';
import { PortableText } from 'next-sanity';
import PostsList from '../components/posts-list';
import { Article, Artwork, Project, Settings } from '../types';
import { fetch } from '../utils/sanity-fetch';
import Section from '../components/section';
import { postFields } from '../utils/sanity-data';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const settings = await fetch<Settings>({
		draftMode: false,
		query: `*[_type == "settings"][0]`,
	});

	if (settings === null) {
		return {};
	}

	return {
		title: settings.websiteName,
		description: settings.description,
		alternates: {
			canonical: '/',
		},
	};
}

export default async function IndexPage() {
	const [settings, artworks, posts, projects] = await Promise.all([
		fetch<Settings>({
			draftMode: false,
			query: `*[_type == "settings"][0]`,
			tags: ['settings'],
		}),
		fetch<Artwork[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "artwork"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
			tags: ['post'],
		}),
		fetch<Article[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "article"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
			tags: ['post'],
		}),
		fetch<Project[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "project"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
			tags: ['post'],
		}),
	]);

	return (
		<>
			<Section limitWidth>
				<PortableText value={settings.introMessage} />
			</Section>
			{artworks && (
				<PostsList title="Artworks" posts={artworks} priorityImageLoading />
			)}
			{posts && <PostsList title="Posts" posts={posts} />}
			{projects && <PostsList title="Projects" posts={projects} />}
		</>
	);
}
