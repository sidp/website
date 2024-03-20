import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PortableText } from '@portabletext/react';
import { Navigation, Post } from '../types';
import PostsList from '../components/posts-list';
import Header from '../components/header';
import { absoluteUrl } from '../utils/url';
import { fetch } from '../utils/sanity-fetch';
import Body from '../components/body';
import Heading from '../components/heading';
import { Container } from '../styles/components';
import Section from '../components/section';
import { postFields } from '../utils/sanity-data';
import { typeNamePlural } from '../utils/strings';

type PostPageProps = {
	navigation: Navigation;
	post: Post;
	posts?: Post[];
};

const PostPage: NextPage<PostPageProps> = ({ navigation, post, posts }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<link rel="canonical" href={absoluteUrl(`/posts/${post.slug}`)} />
			</Head>
			<Header navigation={navigation} />
			<Section>
				<Heading as="h1">{post.title}</Heading>
				<Body value={post.body} />
			</Section>
			<PostsList title={`More in ${typeNamePlural(post.type)}`} posts={posts} />
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

	const [navigation, post] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Post>({
			draftMode: false,
			query: `*[_type == "post" && slug.current == "${ctx.params.slug}"][0] {
				...,
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
		query: `*[_type == "post" && slug.current != "${post.slug.current}" && type == "${post.type}"][0...16] { ${postFields} }`,
	});

	return {
		props: {
			navigation,
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
