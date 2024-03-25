import { defineField, defineType } from 'sanity';

export const navigationType = defineType({
	name: 'navigation',
	title: 'Navigation',
	type: 'document',
	fields: [
		defineField({
			name: 'items',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ type: 'string', name: 'title' },
						{ type: 'string', name: 'href' },
					],
				},
			],
		}),
	],
});
