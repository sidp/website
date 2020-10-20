import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { absoluteUrl } from '../utils/url';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import PostsList from '../components/posts-list';
import { Post, Project } from '../types';
import { apiGet } from '../utils/api';

type IndexPageProps = {
	posts: Post[];
	projects: Project[];
};

const IndexPage: React.FC<IndexPageProps> = ({ posts, projects }) => {
	const description = '';
	const siteUrl = '';
	const frontPageTitle = 'Peter Simonsson – Web developer in Malmö, Sweden';

	return (
		<>
			<Head>
				<title>{frontPageTitle}</title>
				<meta name="description" content={description} />
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={`${siteUrl}`} />
			</Head>
			<Intro>
				<p>
					Welcome to my personal website. During the day I’m a web developer and
					designer at{' '}
					<a href="https://tulastudio.se" target="_blank" rel="noopener">
						Tula Studio
					</a>{' '}
					in Malmö, Sweden. This site contains bits and bobs of what I publish
					online.
				</p>
			</Intro>
			<PostsList posts={posts} />
			<ProjectList title="Projects" projects={projects} />
		</>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async (ctx) => {
	const [posts, projects] = await Promise.all([
		apiGet<Post[]>('posts', {
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
		apiGet<Project[]>('projects', {
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	/*if (typeof frontPage.body === 'string') {
		frontPage.body = markdown(frontPage.body);
	}*/

	return {
		props: {
			posts,
			projects,
		},
		revalidate: 5,
	};
};
