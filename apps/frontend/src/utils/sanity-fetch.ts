import type { Any, ClientReturn } from 'next-sanity';
import { draftMode as nextDraftMode } from 'next/headers';
import { client } from './sanity-client';

export async function fetch<R = Any, const G extends string = string>(
	query: G,
	options?: {
		params?: { [index: string]: string };
		draftMode?: boolean;
		stega?: boolean;
		tags?: string[];
	},
): Promise<ClientReturn<G, R>> {
	const { params, draftMode, tags } = options || {};

	const isEnabled =
		typeof draftMode === 'boolean'
			? draftMode
			: (await nextDraftMode()).isEnabled;

	const perspective = isEnabled ? 'previewDrafts' : 'published';
	const stega = options?.stega || isEnabled;

	console.log(query, params, { perspective, stega, next: { tags } });

	return client.fetch(query, params, { perspective, stega, next: { tags } });
}
