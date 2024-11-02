import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
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
		visionTool(),
		codeInput(),
		table(),
		media(),
	],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
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
	},
});
