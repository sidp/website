import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '../../../../utils/sanity-client';

export const { GET } = defineEnableDraftMode({
	client: client.withConfig({
		token: process.env.SANITY_VIEWER_TOKEN,
	}),
});
