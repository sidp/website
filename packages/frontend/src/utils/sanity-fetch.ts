import type { FilteredResponseQueryOptions } from 'next-sanity';
import { draftMode as nextDraftMode } from 'next/headers';

// import { client } from './sanity-client';

// type FetchClient = typeof client.fetch;
// type Params = Parameters<FetchClient>;

// export const fetch: FetchClient = async (a, b, c) => {
// 	const { isEnabled } = await nextDraftMode();

// 	const draftModeConfig: FilteredResponseQueryOptions = isEnabled
// 		? {
// 				perspective: 'previewDrafts',
// 				useCdn: false,
// 				stega: true,
// 		  }
// 		: {};

// 	return client.fetch(a, b, { ...c, ...draftModeConfig });
// };

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
