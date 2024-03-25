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
