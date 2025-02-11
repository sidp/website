import type {
	Any,
	ClientReturn,
	FilteredResponseQueryOptions,
} from 'next-sanity';
import { draftMode as nextDraftMode } from 'next/headers';
import { client } from './sanity-client';

export async function fetch<R = Any, const G extends string = string>(
	query: G,
	params?: { [index: string]: string },
	options?: FilteredResponseQueryOptions & { draftMode?: boolean },
): Promise<ClientReturn<G, R>> {
	const { draftMode } = options || {};
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

	return client.fetch(query, params, { ...draftModeConfig, ...options });
}

export async function fetchOptions(options: {
	tags: string[];
}): Promise<FilteredResponseQueryOptions> {
	const { isEnabled } = await nextDraftMode();

	const draftModeConfig: FilteredResponseQueryOptions = isEnabled
		? {
				perspective: 'previewDrafts',
				useCdn: false,
				stega: true,
		  }
		: {};

	return {
		...draftModeConfig,
		next: { tags: options.tags },
	};
}
