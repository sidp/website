type StrapiFields = {
	created_by: User | number;
	updated_by: User | number;
	created_at: string;
	updated_at: string;
};

export type StrapiError = {
	statusCode: number;
	error: string;
	message: string;
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

export type Post = StrapiFields & {
	id: number;
	title: string;
	slug: string;
	body: string;
	description?: string;
	link?: string;
	mentions?: Mention[];
};

export type Project = StrapiFields & {
	title: string;
	slug: string;
	description: string;
	agency?: string;
	client?: string;
	year?: string;
	link?: string;
	body?: string;
	images?: Image[];
};

export type Page = StrapiFields & {
	title: string;
	heading?: string;
	description?: string;
	slug: string;
	body?: string;
};

export type Mention = StrapiFields & {
	/* only public fields */
	id: number;
	sourceUrl: string;
	targetUrl: string;
	target: Post;
	postInfo: {
		title?: string;
	};
};

export type FrontPage = StrapiFields & {
	introduction?: string;
};

export type Navigation = StrapiFields & {
	links: NavigationLinkComponent[];
};

export type StrapiComponent = {
	id: number;
	__component: string;
};

export type NavigationLinkComponent = StrapiComponent & {
	__component: 'navigation.link';
	label: string;
	href: string;
	as?: string;
};

export type ContentTextComponent = StrapiComponent & {
	__component: 'content.text';
	body: string;
};

export type ContentImagesComponent = StrapiComponent & {
	__component: 'content.images';
	images: Image[];
};

export type ContentEmbedComponent = StrapiComponent & {
	__component: 'content.embed';
	url: string;
	width: number;
	height: number;
};

export type ContentComponent = ContentTextComponent | ContentImagesComponent;

export const isTextComponent = (thing: any): thing is ContentTextComponent => {
	return thing.__component === 'content.text';
};

export const isImagesComponent = (
	thing: any
): thing is ContentImagesComponent => {
	return thing.__component === 'content.images';
};

export const isEmbedComponent = (
	thing: any
): thing is ContentEmbedComponent => {
	return thing.__component === 'content.embed';
};
