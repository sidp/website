import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { absoluteUrl } from '../utils/url';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import PostsList from '../components/posts-list';
import { FrontPage, Navigation, Post, Project } from '../types';
import { apiGet } from '../utils/api';
import Header from '../components/header';
import markdown from '../utils/markdown';

type IndexPageProps = {
	navigation: Navigation;
	frontPage: FrontPage;
	posts: Post[];
	projects: Project[];
};

const IndexPage: React.FC<IndexPageProps> = ({
	navigation,
	frontPage,
	posts,
	projects,
}) => {
	return (
		<>
			<Head>
				<title>{frontPage.title}</title>
				<meta name="description" content={frontPage.description} />
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={absoluteUrl('/')} />
			</Head>
			<Header navigation={navigation} />
			<Intro dangerouslySetInnerHTML={{ __html: frontPage.introduction }} />
			<PostsList posts={posts} />
			<ProjectList title="Projects" projects={projects} />
		</>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async (ctx) => {
	const [navigation, frontPage, posts, projects] = await Promise.all([
		apiGet<Navigation>('navigation'),
		apiGet<FrontPage>('front-page'),
		apiGet<Post[]>('posts', {
			inFeed: true,
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
		apiGet<Project[]>('projects', {
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	if (typeof frontPage.introduction === 'string') {
		frontPage.introduction = markdown(frontPage.introduction);
	}

	return {
		props: {
			navigation,
			frontPage,
			posts,
			projects,
		},
		revalidate: 5,
	};
};
