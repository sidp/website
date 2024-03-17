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
				<link rel="canonical" href={absoluteUrl(`/posts/${post.slug}`)} />
			</Head>
			<Header navigation={navigation} />
			<PortableText value={post.body} />
			<PostsList posts={posts} />
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

	const [navigation, post, posts] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Post>({
			draftMode: false,
			query: `*[_type == "post" && slug.current == "${ctx.params.slug}"][0]`,
		}),
		fetch<Post[]>({
			draftMode: false,
			query: `*[_type == "post" && slug.current != "${ctx.params.slug}"][0...16]`,
		}),
	]);

	if (!post) {
		return {
			notFound: true,
		};
	}

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
