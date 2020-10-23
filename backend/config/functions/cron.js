'use strict';

const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
	'* * * * *': async () => {
		const toProcess = await strapi.query('mention').find({
			processed: false,
			review_ne: 'rejected',
			_limit: 5,
			_sort: 'created_at:desc',
		});

		await Promise.all(
			toProcess.map(async (mention) => {
				if (!mention.target) return;

				const dom = await getDomFromLink(mention.sourceUrl);
				if (!dom) return;

				const sourceHasLink = await isLinkInDOM(dom, mention.targetUrl);
				const postInfo = await getPostInfo(dom, mention.targetUrl);

				await strapi.query('mention').update(
					{ id: mention.id },
					{
						processed: true,
						review: sourceHasLink ? 'waiting' : 'rejected',
						postInfo: sourceHasLink ? postInfo : {},
					}
				);
			})
		);
	},
};

async function getDomFromLink(url) {
	const res = await fetch(url);
	if (!res.ok) return null;
	const html = await res.text();
	if (!html) return null;
	return new JSDOM(html);
}

async function isLinkInDOM(dom, target) {
	const links = dom.window.document.querySelectorAll('a[href]');
	const trimUrl = (url) => url.trim().trim('/');
	const targetUrl = trimUrl(target);
	return [...links].some((link) => trimUrl(link.href) == targetUrl);
}

async function getPostInfo(dom, target) {
	const titleElement = dom.window.document.querySelector('title');
	return {
		title: titleElement ? titleElement.textContent || '' : '',
	}
}
