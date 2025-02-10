import type { Slug } from '../../../sanity.types';
import type { ImageFields } from '../../types';

export type PostItem = {
	_id: string;
	image?: ImageFields | null;
	type?: string | null;
	slug?: Slug;
	title?: string;
	description?: string;
	meta?: {
		client?: string;
	};
};

export const isValidPostItem = (post: unknown): post is PostItem => {
	return (
		typeof post === 'object' &&
		post !== null &&
		'_id' in post &&
		'type' in post &&
		'slug' in post &&
		'title' in post
	);
};
