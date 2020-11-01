import { SitemapStream, streamToPromise } from 'sitemap';
import { NextApiHandler } from 'next';
import { absoluteUrl } from '../../utils/url';
import apiGet from '../../utils/api';
import { Page, Post, Project } from '../../types';

const sitemap: NextApiHandler = async (req, res) => {
	const smStream = new SitemapStream({
		hostname: process.env.APP_BASENAME,
	});

	smStream.write({ url: absoluteUrl('/') });

	const [pages, posts, projects] = await Promise.all([
		apiGet<Page[]>('pages', { _limit: -1 }),
		apiGet<Post[]>('posts', { _limit: -1 }),
		apiGet<Project[]>('projects', { _limit: -1 }),
	]);

	pages.forEach((page) => {
		smStream.write({
			url: absoluteUrl(`/${page.slug}`),
		});
	});

	posts.forEach((post) => {
		smStream.write({
			url: absoluteUrl(`/posts/${post.slug}`),
		});
	});

	projects.forEach((project) => {
		smStream.write({
			url: absoluteUrl(`/projects/${project.slug}`),
		});
	});

	smStream.end();

	const sitemap = await streamToPromise(smStream).then((sm: any) =>
		sm.toString()
	);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();
};

export default sitemap;
