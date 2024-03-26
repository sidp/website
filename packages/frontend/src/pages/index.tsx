import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PortableText } from 'next-sanity';
import { absoluteUrl } from '../utils/url';
import PostsList from '../components/posts-list';
import { Article, Artwork, Navigation, Project, Settings } from '../types';
import Header from '../components/header';
import Footer from '../components/footer';
import { fetch } from '../utils/sanity-fetch';
import Section from '../components/section';
import { postFields } from '../utils/sanity-data';
import title from '../utils/title';

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
				<title>{title(settings.websiteName)}</title>
				<meta name="description" content={settings.description} />
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={absoluteUrl('/')} />
			</Head>
			<Header navigation={navigation} />
			<Section limitWidth>
				<PortableText value={settings.introMessage} />
			</Section>
			{artworks && (
				<PostsList
					title="Computer graphics"
					posts={artworks}
					priorityImageLoading
				/>
			)}
			{posts && <PostsList title="Posts" posts={posts} />}
			{projects && <PostsList title="Projects" posts={projects} />}
			<Footer links={settings.socialMedia} />
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
			query: `*[_type == "post" && type == "artwork"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
		}),
		fetch<Article[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "article"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
		}),
		fetch<Project[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "project"][0...16] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
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
