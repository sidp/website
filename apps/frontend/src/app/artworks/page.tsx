import type { Metadata } from 'next';
import { defineQuery } from 'next-sanity';
import { notFound } from 'next/navigation';
import PostsList from '../../components/posts-list';
import { postListFields } from '../../utils/sanity-data';
import { fetch } from '../../utils/sanity-fetch';

export const metadata: Metadata = {
	title: 'Artworks',
	alternates: {
		canonical: '/artworks',
	},
};

export default async function ArtworkPage() {
	const artworksPageQuery = defineQuery(`
		*[_type == "post" && type == "artwork"] | order(meta.date desc, _createdAt desc) {
			${postListFields}
		}
	`);
	const artworks = await fetch(artworksPageQuery, undefined, {
		next: { tags: ['post'] },
	});

	if (!artworks || artworks.length === 0) {
		notFound();
	}

	return <PostsList title="Artworks" posts={artworks} priorityImageLoading />;
}
