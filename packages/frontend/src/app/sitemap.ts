import { MetadataRoute } from 'next';
import dayjs from 'dayjs';
import { Post } from '../types';
import { fetch } from '../utils/sanity-fetch';
import { absoluteUrl } from '../utils/url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post"]`,
	});

	const lastModified = posts.reduce((latest, post) => {
		const updatedAt = dayjs(post._updatedAt).unix();
		return updatedAt > latest ? updatedAt : latest;
	}, 0);

	return [
		{
			url: absoluteUrl('/'),
			lastModified: dayjs.unix(lastModified).toISOString(),
		},
		...posts.map((post) => ({
			url: absoluteUrl(`/${post.slug.current}`),
			lastModified: post._updatedAt,
		})),
	];
}
