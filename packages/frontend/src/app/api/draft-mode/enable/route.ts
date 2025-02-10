import { client } from '../../../../utils/sanity-client';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';

export const { GET } = defineEnableDraftMode({
	client: client.withConfig({
		token: process.env.SANITY_VIEWER_TOKEN,
	}),
});
