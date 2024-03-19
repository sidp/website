import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { absoluteUrl } from '../utils/url';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import PostsList from '../components/posts-list';
import { Article, Artwork, Navigation, Project, Settings } from '../types';
import Header from '../components/header';
import { fetch } from '../utils/sanity-fetch';
import { PortableText } from 'next-sanity';
import Section from '../components/section';
import { postFields } from '../utils/sanity-data';

type IndexPageProps = {
	navigation: Navigation;
	settings: Settings;
	artworks: Artwork[];
	posts: Article[];
	projects: Project[];
};

const IndexPage: React.FC<IndexPageProps> = ({
	navigation,
	settings,
	artworks,
	posts,
	projects,
}) => {
	return (
		<>
			<Head>
				<title>{settings.websiteName}</title>
				{/* <meta name="description" content={frontPage.description} /> */}
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={absoluteUrl('/')} />
			</Head>
			<Header navigation={navigation} />
			<Section limitWidth>
				<PortableText value={settings.introMessage} />
			</Section>
			{artworks && <PostsList title="Computer graphics" posts={artworks} />}
			{posts && <PostsList posts={posts} />}
			{projects && <PostsList title="Projects" posts={projects} />}
		</>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
	const [navigation, settings, artworks, posts, projects] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Settings>({
			draftMode: false,
			query: `*[_type == "settings"][0]`,
		}),
		fetch<Artwork[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "artwork"][0...16] { ${postFields} }`,
		}),
		fetch<Article[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "article"][0...16] { ${postFields} }`,
		}),
		fetch<Project[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "project"][0...16] { ${postFields} }`,
		}),
	]);

	return {
		props: {
			navigation,
			settings,
			artworks,
			posts,
			projects,
		},
		revalidate: 5,
	};
};
