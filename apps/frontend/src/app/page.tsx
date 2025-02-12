import type { Metadata } from 'next';
import { defineQuery, PortableText } from 'next-sanity';
import PostsList from '../components/posts-list';
import Section from '../components/section';
import { postListFields } from '../utils/sanity-data';
import { fetch } from '../utils/sanity-fetch';

export async function generateMetadata(): Promise<Metadata> {
	const homeMetadataQuery = defineQuery(`
		*[_type == "settings"][0] {
			websiteName,
			description,
		}
	`);
	const settings = await fetch(homeMetadataQuery, {
		tags: ['post'],
		stega: false,
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
	const homeSettingsQuery = defineQuery(`
		*[_type == "settings"][0] {
			introMessage
		}
	`);

	const homeArtworksQuery = defineQuery(`
		*[_type == "post" && type == "artwork"][0...16] | order(meta.date desc, _createdAt desc) {
			${postListFields}
		}
	`);

	const homePostsQuery = defineQuery(`
		*[_type == "post" && type == "article"][0...16] | order(meta.date desc, _createdAt desc) {
			${postListFields}
		}
	`);

	const homeProjectsQuery = defineQuery(`
		*[_type == "post" && type == "project"][0...16] | order(meta.date desc, _createdAt desc) {
			${postListFields}
		}
	`);

	const [settings, artworks, posts, projects] = await Promise.all([
		fetch(homeSettingsQuery, { tags: ['settings'] }),
		fetch(homeArtworksQuery, { tags: ['post'] }),
		fetch(homePostsQuery, { tags: ['post'] }),
		fetch(homeProjectsQuery, { tags: ['post'] }),
	]);

	return (
		<>
			{settings?.introMessage && (
				<Section limitWidth>
					<PortableText value={settings.introMessage} />
				</Section>
			)}
			{artworks && (
				<PostsList title="Artworks" posts={artworks} priorityImageLoading />
			)}
			{posts && <PostsList title="Posts" posts={posts} />}
			{projects && <PostsList title="Projects" posts={projects} />}
		</>
	);
}
