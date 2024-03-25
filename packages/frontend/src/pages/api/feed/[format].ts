import { Feed } from 'feed';
import { NextApiHandler } from 'next';
import { absoluteUrl } from '../../../utils/url';
import apiGet from '../../../utils/api';
import { Post } from '../../../types';

export const feedLinks = {
	json: absoluteUrl(`/feed/json`),
	atom: absoluteUrl(`/feed/atom`),
};

const feed: NextApiHandler = async (req, res) => {
	let { format } = req.query;
	format = Array.isArray(format) ? format[0] : format;

	const posts = await apiGet<Post[]>('posts', {
		inFeed: true,
		_sort: 'created_at:DESC',
		_limit: 16,
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
			id: absoluteUrl(`/posts/${post.slug}`),
			link: absoluteUrl(`/posts/${post.slug}`),
			content: markdown(post.body),
			date: new Date(post.updated_at),
			published: new Date(post.created_at),
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
