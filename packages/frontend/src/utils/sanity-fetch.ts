import type { QueryParams } from 'next-sanity';

import { client } from './sanity-client';

export const token = process.env.SANITY_API_READ_TOKEN;

export async function fetch<QueryResponse>({
	draftMode,
	query,
	params = {},
}: {
	draftMode: boolean;
	query: string;
	params?: QueryParams;
}) {
	if (draftMode && !token) {
		throw new Error(
			'The `SANITY_API_READ_TOKEN` environment variable is required.',
		);
	}

	return client.fetch<QueryResponse>(query, params, {
		token,
		perspective: draftMode ? 'previewDrafts' : 'published',
	});
}
