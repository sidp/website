import { PortableTextBlock, PortableTextProps } from '@portabletext/react';

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

type SanityImage = {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
};

/** Fields corresponding to imageFields in sanity-data.ts */
export type SanityDecoratedImage = SanityImage & {
	alt: string;
	width: number;
	height: number;
	color?: string;
	loading?: 'lazy' | 'eager';
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
		body: PortableTextBlock[];
		meta?: { [index: string]: string };
		image?: SanityDecoratedImage;
		description?: string;
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

export type Settings = SanityDocument<
	'navigation',
	{
		websiteName: string;
		introMessage: PortableTextProps['value'];
		description: string;
		socialMedia: {
			label: string;
			title: string;
			url: string;
		}[];
	}
>;
