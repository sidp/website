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
			name: 'description',
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'meta',
			type: 'object',
			fields: [
				defineField({
					name: 'agency',
					type: 'string',
					hidden: ({ document }) => document?.type !== 'project',
				}),
				defineField({
					name: 'client',
					type: 'string',
					hidden: ({ document }) => document?.type !== 'project',
				}),
				defineField({
					name: 'date',
					type: 'date',
					hidden: ({ document }) => {
						if (typeof document?.type !== 'string') return false;
						return !['project', 'artwork'].includes(document.type);
					},
				}),
			],
		}),
		defineField({
			name: 'body',
			type: 'array',
			options: {},
			of: [
				{ type: 'block' },
				{ type: 'image', fields: [{ name: 'alt', type: 'string' }] },
				{
					name: 'videoEmbed',
					title: 'Video Embed',
					type: 'object',
					fields: [{ name: 'url', type: 'url', title: 'URL' }],
				},
				{
					type: 'code',
					options: {
						language: 'typescript',
						languageAlternativs: [
							{ title: 'TypeScript', value: 'typescript' },
							{ title: 'JavaScript', value: 'javascript' },
							{ title: 'HTML', value: 'html' },
							{ title: 'CSS', value: 'css' },
						],
					},
				},
			],
		}),
	],
});
