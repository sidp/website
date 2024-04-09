import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import Icon from './components/icon';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

const singletonTypes = new Set(['navigation', 'settings']);

export default defineConfig({
	name: 'default',
	title: 'Peter Simonsson',
	icon: Icon,

	projectId: 'hxcrb1u6',
	dataset: 'production',

	plugins: [structureTool({ structure }), visionTool(), codeInput(), table()],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
	},

	document: {
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(({ action }) => action && singletonActions.has(action))
				: input,
	},
});
