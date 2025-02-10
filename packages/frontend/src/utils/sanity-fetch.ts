import type { FilteredResponseQueryOptions, QueryParams } from 'next-sanity';
import { draftMode as nextDraftMode } from 'next/headers';

import { client } from './sanity-client';

export async function fetch<QueryResponse>({
	draftMode,
	query,
	tags,
	params = {},
}: {
	draftMode?: boolean;
	query: string;
	tags?: string[];
	params?: QueryParams;
}) {
	const isEnabled =
		typeof draftMode === 'boolean'
			? draftMode
			: (await nextDraftMode()).isEnabled;

	const draftModeConfig: FilteredResponseQueryOptions = isEnabled
		? {
				perspective: 'previewDrafts',
				useCdn: false,
				stega: true,
		  }
		: {};

	return client.fetch<QueryResponse>(query, params, {
		next: {
			tags,
		},
		...draftModeConfig,
	});
}
