import imageUrlBuilder from '@sanity/image-url';
import dayjs from 'dayjs';
import type { Metadata, ResolvingMetadata } from 'next';
import { defineQuery } from 'next-sanity';
import { notFound } from 'next/navigation';
import Body from '../../components/body';
import Heading from '../../components/heading';
import Meta from '../../components/meta';
import PostsList from '../../components/posts-list';
import Section from '../../components/section';
import { client } from '../../utils/sanity-client';
import {
	imageFields,
	postFields,
	postListFields,
} from '../../utils/sanity-data';
import { typeNamePlural } from '../../utils/strings';
import { fetch } from '../../utils/sanity-fetch';
const builder = imageUrlBuilder(client);

type PostPageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(
	{ params }: PostPageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { slug } = await params;

	const postMetadataQuery = defineQuery(`
		*[_type == "post" && slug.current == $slug][0] {
			title,
			description,
			slug,
			image { ${imageFields} }
		}
	`);

	const post = await fetch(postMetadataQuery, {
		params: { slug },
		tags: ['post'],
		stega: false,
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
			canonical: post.slug ? `/${post.slug.current}` : undefined,
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;

	const postPageQuery = defineQuery(`
		*[_type == "post" && slug.current == $slug][0] {
			${postFields}
		}
	`);

	const post = await fetch(postPageQuery, {
		params: { slug },
		tags: ['post'],
	});

	if (!post || !post.type) {
		notFound();
	}

	const postPageOtherPostsQuery = defineQuery(`
		*[_type == "post" && slug.current != $slug && type == $type][0...16] | order(meta.date desc, _createdAt desc) {
			${postListFields}
		}
	`);

	const posts = await fetch(postPageOtherPostsQuery, {
		params: { slug, type: post.type },
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
				{post.body && <Body value={post.body} />}
			</Section>
			{post.type && post.type !== 'page' && (
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
	const postsStaticParamsQuery = defineQuery(`
		*[_type == "post"] { slug }
	`);
	const posts = await fetch(postsStaticParamsQuery, {
		tags: ['post'],
		draftMode: false,
	});

	return posts
		.map((post) => ({ params: { slug: post.slug?.current } }))
		.filter(({ params }) => Boolean(params.slug));
}
