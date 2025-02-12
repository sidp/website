import { Feed } from 'feed';
import { defineQuery, toPlainText } from 'next-sanity';
import { postFields } from '../../../../utils/sanity-data';
import { fetch } from '../../../../utils/sanity-fetch';
import { absoluteUrl } from '../../../../utils/url';

const feedLinks = {
	json: absoluteUrl(`/feed/json`),
	atom: absoluteUrl(`/feed/atom`),
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ format: string }> },
) {
	const feedQuery = defineQuery(`
		*[_type == "post" && type != "page"][0...16] | order(_createdAt desc) {
			${postFields}
		}
	`);

	const posts = await fetch(feedQuery, {
		tags: ['post'],
	});

	const f = new Feed({
		title: 'Peter Simonsson',
		id: absoluteUrl('/'),
		copyright: '',
		feedLinks,
		generator: 'simonsson.com',
	});

	posts.forEach((post) => {
		if (
			post.title === undefined ||
			post.slug === undefined ||
			post.body === undefined
		) {
			return;
		}

		f.addItem({
			title: post.title,
			id: absoluteUrl(`/${post.slug.current}`),
			link: absoluteUrl(`/${post.slug.current}`),
			content: post.body ? toPlainText(post.body) : '',
			date: new Date(post._updatedAt),
			published: new Date(post._createdAt),
		});
	});

	let { format } = await params;
	switch (format) {
		case 'atom':
			return new Response(f.atom1(), {
				headers: {
					'Content-Type': 'application/atom+xml',
				},
			});
		case 'json':
			return new Response(f.json1(), {
				headers: {
					'Content-Type': 'application/feed+json',
				},
			});
	}

	return new Response('Invalid feed type.', { status: 400 });
}
