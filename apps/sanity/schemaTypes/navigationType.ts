import { defineArrayMember, defineField, defineType } from 'sanity';

export const navigationType = defineType({
	name: 'navigation',
	title: 'Navigation',
	type: 'document',
	fields: [
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ type: 'string', name: 'title' }),
						defineField({ type: 'string', name: 'href' }),
					],
				}),
			],
		}),
	],
});
