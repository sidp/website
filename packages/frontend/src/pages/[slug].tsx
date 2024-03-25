import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navigation, Post, Settings } from '../types';
import PostsList from '../components/posts-list';
import Header from '../components/header';
import { absoluteUrl } from '../utils/url';
import { fetch } from '../utils/sanity-fetch';
import Body from '../components/body';
import Heading from '../components/heading';
import Section from '../components/section';
import { postFields } from '../utils/sanity-data';
import { typeNamePlural } from '../utils/strings';
import Footer from '../components/footer';
import dayjs from 'dayjs';
import Meta from '../components/meta';
import title from '../utils/title';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../utils/sanity-client';
const builder = imageUrlBuilder(client);

type PostPageProps = {
	navigation: Navigation;
	settings: Settings;
	post: Post;
	posts?: Post[];
};

const PostPage: NextPage<PostPageProps> = ({
	navigation,
	settings,
	post,
	posts,
}) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const ogImage = post.image
		? builder.image(post.image).size(2400, 1260).quality(80).url()
		: '/images/og-image.png';

	return (
		<>
			<Head>
				<title>{title(post.title, settings.websiteName)}</title>
				<link rel="canonical" href={absoluteUrl(`/${post.slug.current}`)} />
				<meta property="og:image" content={absoluteUrl(ogImage)} />
			</Head>
			<Header navigation={navigation} />
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
			<Footer links={settings.socialMedia} />
		</>
	);
};

export default PostPage;

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
	const slug = ctx.params?.slug;

	if (typeof slug !== 'string') {
		return {
			notFound: true,
		};
	}

	const [navigation, settings, post] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Settings>({
			draftMode: false,
			query: `*[_type == "settings"][0]`,
		}),
		fetch<Post>({
			draftMode: false,
			query: `*[_type == "post" && slug.current == "${ctx.params.slug}"][0] {
				${postFields},
				body[] {
					...,
					_type == "image" => {
						asset,
						alt,
						"width": asset->metadata.dimensions.width,
						"height": asset->metadata.dimensions.height,
						"lqip": asset->metadata.lqip,
					}
				}
			}`,
		}),
	]);

	if (!post) {
		return {
			notFound: true,
		};
	}

	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post" && slug.current != "${post.slug.current}" && type == "${post.type}"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
	});

	return {
		props: {
			navigation,
			settings,
			post,
			posts,
		},
		revalidate: 5,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await fetch<Post[]>({
		draftMode: false,
		query: `*[_type == "post"]`,
	});

	return {
		paths: posts.map((post) => ({ params: { slug: post.slug.current } })),
		fallback: true,
	};
};
