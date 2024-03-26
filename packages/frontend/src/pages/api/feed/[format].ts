import { Feed } from 'feed';
import { NextApiHandler } from 'next';
import { absoluteUrl } from '../../../utils/url';
import { fetch } from '../../../utils/sanity-fetch';
import { Post } from '../../../types';
import { toPlainText } from 'next-sanity';

export const feedLinks = {
	json: absoluteUrl(`/feed/json`),
	atom: absoluteUrl(`/feed/atom`),
};

const feed: NextApiHandler = async (req, res) => {
	let { format } = req.query;
	format = Array.isArray(format) ? format[0] : format;

	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post" && type !== "page"][0...16] | order(_createdAt desc)`,
	});

	const f = new Feed({
		title: 'Peter Simonsson',
		id: absoluteUrl('/'),
		copyright: '',
		feedLinks: feedLinks,
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
			res.setHeader('Content-Type', 'application/atom+xml');
			return res.send(f.atom1());
		case 'json':
			res.setHeader('Content-Type', 'application/feed+json');
			return res.json(f.json1());
	}

	return res.status(400).send('Invalid feed type.');
};

export default feed;
