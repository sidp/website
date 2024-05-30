import * as React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Post } from '../../types';
import PostsList from '../../components/posts-list';
import { fetch } from '../../utils/sanity-fetch';
import Body from '../../components/body';
import Heading from '../../components/heading';
import Section from '../../components/section';
import { imageFields, postFields } from '../../utils/sanity-data';
import { typeNamePlural } from '../../utils/strings';
import dayjs from 'dayjs';
import Meta from '../../components/meta';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../utils/sanity-client';
import { notFound } from 'next/navigation';
const builder = imageUrlBuilder(client);

type PostPageProps = {
	params: { slug: string };
};

export async function generateMetadata(
	{ params }: PostPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const post = await fetch<Post>({
		draftMode: false,
		query: `*[_type == "post" && slug.current == "${params.slug}"][0] {
			${postFields},
			body[] {
				...,
				_type == "image" => {
					${imageFields}
				}
			}
		}`,
		tags: ['post'],
	});

	if (!post) {
		return {};
	}

	const ogImage = post.image
		? builder.image(post.image).size(2400, 1260).quality(80).url()
		: '/images/og-image.png';

	return {
		title: post.title || (await parent).title,
		description: post.description,
		openGraph: {
			images: ogImage,
		},
		alternates: {
			canonical: `/${post.slug.current}`,
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await fetch<Post>({
		draftMode: false,
		query: `*[_type == "post" && slug.current == "${params.slug}"][0] {
			${postFields}
		}`,
		tags: ['post'],
	});

	if (!post) {
		notFound();
	}

	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post" && slug.current != "${post.slug.current}" && type == "${post.type}"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
		tags: ['post'],
	});

	return (
		<>
			<Section>
				<header className="mb-4 mx-auto max-w-3xl">
					<Heading as="h1">{post.title}</Heading>
					<Meta
						agency={post.meta?.agency}
						client={post.meta?.client}
						year={
							post.meta?.date ? dayjs(post.meta.date).format('YYYY') : undefined
						}
					/>
				</header>
				<Body value={post.body} />
			</Section>
			{post.type !== 'page' && (
				<PostsList
					title={`More in ${typeNamePlural(post.type)}`}
					posts={posts}
					className="border-t border-dotted border-current pt-6"
				/>
			)}
		</>
	);
}

export async function generateStaticParams() {
	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post"]`,
		tags: ['post'],
	});

	return posts.map((post) => ({ params: { slug: post.slug.current } }));
}
