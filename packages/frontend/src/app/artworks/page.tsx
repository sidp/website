import * as React from 'react';
import { Metadata } from 'next';
import { Artwork } from '../../types';
import { fetch } from '../../utils/sanity-fetch';
import { postFields } from '../../utils/sanity-data';
import PostsList from '../../components/posts-list';

export const metadata: Metadata = {
	title: 'Artworks',
	alternates: {
		canonical: '/artworks',
	},
};

export default async function ArtworkPage() {
	const artworks = await fetch<Artwork[]>({
		draftMode: false,
		query: `*[_type == "post" && type == "artwork"] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
	});

	return <>{artworks && <PostsList title="Artworks" posts={artworks} />}</>;
}
