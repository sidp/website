import { PortableTextProps } from '@portabletext/react';

type SanitySlug = {
	current: string;
	_type: 'slug';
};

type SanityDocument<T extends string, K> = {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
} & K;

type BodyField = [];

export type StrapiError = {
	statusCode: number;
	error: string;
	message: string;
};

type SanityImage = {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
};

type ImageFormat = {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	url: string;
	width: number;
};

export type Image = Omit<ImageFormat, 'path'> & {
	id: number;
	alternativeText: string;
	caption: string;
	ext: string;
	formats: { [key: string]: ImageFormat };
	hash: string;
	height: number;
	mime: string;
	name: string;
	previewUrl: string | null;
	provider: 'local';
	provider_metadata: null;
	size: number;
	url: string;
	width: number;
};

export type User = {
	id: number;
	firstname: string;
	lastname: string;
	username: string | null;
};

export type Post<T extends string = string> = SanityDocument<
	'post',
	{
		title: string;
		type: T;
		slug: SanitySlug;
		body: PortableTextProps['value'];
		image?: SanityImage;
	}
>;

export type Article = Post<'article'>;
export type Project = Post<'project'>;
export type Page = Post<'page'>;
export type Artwork = Post<'artwork'>;

export type Navigation = SanityDocument<
	'navigation',
	{
		items: { title: string; href: string }[];
	}
>;
