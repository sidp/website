import { SitemapStream, streamToPromise } from 'sitemap';
import { NextApiHandler } from 'next';
import { absoluteUrl } from '../../utils/url';
import { fetch } from '../../utils/sanity-fetch';
import { Post } from '../../types';

const sitemap: NextApiHandler = async (req, res) => {
	const smStream = new SitemapStream({
		hostname: process.env.APP_BASENAME,
	});

	smStream.write({ url: absoluteUrl('/') });

	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post"]`,
	});

	posts.forEach((page) => {
		smStream.write({
			url: absoluteUrl(`/${page.slug}`),
		});
	});

	smStream.end();

	const sitemap = await streamToPromise(smStream).then((sm: any) =>
		sm.toString(),
	);

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();
};

export default sitemap;
