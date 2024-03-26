import { defineField, defineType } from 'sanity';

export const settingsType = defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	fields: [
		defineField({ name: 'websiteName', type: 'string' }),
		defineField({
			name: 'introMessage',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Message displayed on the homepage.',
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 4,
			description: 'Meta description for SEO purposes.',
		}),
		defineField({
			name: 'socialMedia',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							type: 'string',
						}),
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'url',
							type: 'string',
						}),
					],
				},
			],
		}),
	],
});
