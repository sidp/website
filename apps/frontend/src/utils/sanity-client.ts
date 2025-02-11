import { createClient } from 'next-sanity';

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: '2024-12-01',
	useCdn: false,
	perspective: 'published',
	token: process.env.SANITY_VIEWER_TOKEN,
	stega: {
		studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
	},
});
