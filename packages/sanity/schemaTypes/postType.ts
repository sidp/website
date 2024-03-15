import { defineField, defineType } from 'sanity';

export const postType = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			hidden: ({ document }) => !document?.title,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'type',
			type: 'string',
			options: {
				list: ['article', 'project', 'page', 'artwork'],
			},
			initialValue: 'article',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'image',
			type: 'image',
		}),
		defineField({
			name: 'meta',
			type: 'object',
			fields: [
				defineField({
					name: 'agency',
					type: 'string',
					validation: (rule) => rule.required(),
					hidden: ({ document }) => document?.type !== 'project',
				}),
				defineField({
					name: 'client',
					type: 'string',
					hidden: ({ document }) => document?.type !== 'project',
				}),
			],
		}),
		defineField({
			name: 'date',
			type: 'date',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'body',
			type: 'array',
			options: {},
			of: [
				{ type: 'block' },
				{ type: 'image', fields: [{ name: 'alt', type: 'string' }] },
			],
		}),
	],
});
