import { Feed } from 'feed';
import { absoluteUrl } from '../../../../utils/url';
import { fetch } from '../../../../utils/sanity-fetch';
import { Post } from '../../../../types';
import { toPlainText } from 'next-sanity';

const feedLinks = {
	json: absoluteUrl(`/feed/json`),
	atom: absoluteUrl(`/feed/atom`),
};

export async function GET(
	_request: Request,
	{ params }: { params: { format: string } },
) {
	let { format } = params;

	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post" && type != "page"][0...16] | order(_createdAt desc)`,
	});

	const f = new Feed({
		title: 'Peter Simonsson',
		id: absoluteUrl('/'),
		copyright: '',
		feedLinks,
		generator: 'simonsson.com',
	});

	posts.forEach((post) => {
		f.addItem({
			title: post.title,
			id: absoluteUrl(`/${post.slug.current}`),
			link: absoluteUrl(`/${post.slug.current}`),
			content: toPlainText(post.body),
			date: new Date(post._updatedAt),
			published: new Date(post._createdAt),
		});
	});

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
