import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import MarkdownPage from '../../components/markdown-page';
import { Mention, Post } from '../../types';
import markdown from '../../utils/markdown';
import apiGet from '../../utils/api';
import ErrorPage404 from '../404';
import styled from 'styled-components';
import { cubicBezierFadeIn } from '../../styles/variables';
import PostsList from '../../components/posts-list';
import MentionsList from '../../components/mentions-list';

type PostPageProps = {
	post: Post | null;
	posts?: Post[];
	mentions?: Mention[];
};

const PostPage: NextPage<PostPageProps> = ({ post, posts, mentions }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!post) {
		return <ErrorPage404 />;
	}

	return (
		<>
			<StyledMarkdownPage page={post} role="main" showDate />
			{mentions && <MentionsList mentions={mentions} />}
			<PostsList posts={posts} />
		</>
	);
};

export default PostPage;

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
	const [singlePost, posts] = await Promise.all([
		apiGet<Post[]>('posts', {
			slug: ctx.params.slug,
			_limit: 1,
		}),
		apiGet<Post[]>('posts', {
			slug_ne: ctx.params.slug,
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	const post = singlePost && singlePost[0] ? singlePost[0] : null;
	if (!post) {
		return {
			props: { post: null },
			revalidate: 1,
		};
	}

	const mentions = await apiGet<Mention[]>('mentions', {
		target: post.id,
		_sort: 'created_at:DESC',
	});

	if (typeof post.body === 'string') {
		post.body = markdown(post.body);
	}

	return {
		props: {
			post: post,
			posts: posts,
			mentions: mentions,
		},
		revalidate: 5,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await apiGet<Post[]>('posts');

	return {
		paths: posts.map((post) => ({ params: { slug: post.slug } })),
		fallback: true,
	};
};

const StyledMarkdownPage = styled(MarkdownPage)`
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;
`;
