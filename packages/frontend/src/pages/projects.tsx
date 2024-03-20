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

type IndexPageProps = {
	navigation: Navigation;
	settings: Settings;
	projects: Project[];
};

const IndexPage: React.FC<IndexPageProps> = ({
	navigation,
	settings,
	projects,
}) => {
	return (
		<>
			<Head>
				<title>Projects</title>
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<link rel="canonical" href={absoluteUrl('/projects')} />
			</Head>
			<Header navigation={navigation} />
			{projects && <PostsList title="Projects" posts={projects} />}
			<Footer links={settings.socialMedia} />
		</>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
	const [navigation, settings, projects] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Settings>({
			draftMode: false,
			query: `*[_type == "settings"][0]`,
		}),
		fetch<Project[]>({
			draftMode: false,
			query: `*[_type == "post" && type == "project"] { ${postFields} }`,
		}),
	]);

	return {
		props: {
			navigation,
			settings,
			projects,
		},
		revalidate: 5,
	};
};
