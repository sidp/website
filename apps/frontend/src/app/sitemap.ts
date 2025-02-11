import dayjs from 'dayjs';
import type { MetadataRoute } from 'next';
import { defineQuery } from 'next-sanity';
import type { Slug } from '../../sanity.types';
import { client } from '../utils/sanity-client';
import { absoluteUrl } from '../utils/url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapQuery = defineQuery(`
		*[_type == "post"] {
			_updatedAt,
			slug,
		}
	`);
	const posts = await client.fetch(sitemapQuery, undefined, {
		next: { tags: ['post'] },
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
		...posts
			.filter(
				(post): post is { _updatedAt: string; slug: Slug } =>
					typeof post._updatedAt === 'string' && post.slug !== null,
			)
			.map((post) => ({
				url: absoluteUrl(`/${post.slug.current}`),
				lastModified: post._updatedAt,
			})),
	];
}
