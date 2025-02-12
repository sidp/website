import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { defineDocuments, presentationTool } from 'sanity/presentation';
import { table } from '@sanity/table';
import { media, mediaAssetSource } from 'sanity-plugin-media';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import Icon from './components/icon';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

const singletonTypes = new Set(['navigation', 'settings']);

export default defineConfig({
	name: 'default',
	title: 'Peter Simonsson',
	icon: Icon,

	projectId: 'hxcrb1u6',
	dataset: 'production',

	plugins: [
		structureTool({ structure }),
		presentationTool({
			previewUrl: {
				origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
				preview: '/',
				previewMode: {
					enable: '/api/draft-mode/enable',
				},
			},
			resolve: {
				mainDocuments: defineDocuments([
					{
						route: `/`,
						filter: `_type == "settings" && _id == "settings"`,
					},
					{
						route: `/:slug`,
						filter: `_type == "post" && slug.current == $slug`,
					},
				]),
			},
		}),
		visionTool(),
		codeInput(),
		table(),
		media(),
	],

	schema: {
		types: schemaTypes,
		templates: (templates) => {
			const noSingletons = templates.filter(
				({ schemaType }) => !singletonTypes.has(schemaType),
			);
			return [
				...noSingletons,
				{
					id: 'article',
					title: 'Article',
					schemaType: 'post',
					value: { type: 'article' },
				},
				{
					id: 'project',
					title: 'Project',
					schemaType: 'post',
					value: { type: 'project' },
				},
				{
					id: 'page',
					title: 'Page',
					schemaType: 'post',
					value: { type: 'page' },
				},
				{
					id: 'artwork',
					title: 'Artwork',
					schemaType: 'post',
					value: { type: 'artwork' },
				},
			];
		},
	},

	form: {
		file: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource !== mediaAssetSource,
				);
			},
		},
		image: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource === mediaAssetSource,
				);
			},
		},
	},

	document: {
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(({ action }) => action && singletonActions.has(action))
				: input,
		newDocumentOptions: (prev, { creationContext }) => {
			if (
				creationContext.type === 'global' ||
				creationContext.type === 'structure'
			) {
				return prev.filter(
					(templateItem) => templateItem.templateId !== 'post',
				);
			}
			return prev;
		},
	},
});
