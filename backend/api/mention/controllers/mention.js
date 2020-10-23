'use strict';
const { sanitizeEntity } = require('strapi-utils');

const removeFragment = (url) => {
	return url.replace(/(#.+)$/, '');
};

const isUrl = (url) => {
	return url.match(/^https?:\/\/[^/]+/);
};

const findTargetEntry = async (url) => {
	const matches = url.match(/posts\/([^/]+)\/?$/);
	const postSlug = matches && matches[1];

	if (postSlug) {
		return await strapi.query('post').findOne({
			slug: postSlug,
		});
	}

	return null;
};

module.exports = {
	async find(ctx) {
		let entities;

		ctx.query = {
			...ctx.query,
			review: 'approved',
			processed: true,
		};

		if (ctx.query._q) {
			entities = await strapi.services.mention.search(ctx.query);
		} else {
			entities = await strapi.services.mention.find(ctx.query);
		}

		return entities.map((entity) =>
			sanitizeEntity(entity, { model: strapi.models.mention })
		);
	},

	async upsert(ctx) {
		let { target, source } = ctx.request.body;

		const targetUrl = removeFragment(target);
		const sourceUrl = removeFragment(source);

		if (!isUrl(targetUrl) || !isUrl(sourceUrl)) {
			ctx.throw(422);
			return 'Unprocessable Entity';
		}

		const targetEntry = findTargetEntry(targetUrl);
		if (!targetEntry) {
			ctx.throw(404);
			return 'Not found';
		}

		let mention = await strapi.query('mention').findOne({
			targetUrl,
			sourceUrl,
		});

		if (!mention) {
			mention = await strapi.query('mention').create({
				target: targetEntry,
				targetUrl,
				sourceUrl,
				review: 'waiting',
				processed: false,
			});
		} else {
			mention = await strapi.query('mention').update(
				{
					id: mention.id,
				},
				{
					review: 'waiting',
					processed: false,
				}
			);
		}

		return sanitizeEntity(mention, { model: strapi.models.mention });
	},
};
