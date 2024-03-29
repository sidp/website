import * as React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { absoluteUrl } from '../utils/url';
import PostsList from '../components/posts-list';
import { Artwork, Navigation, Settings } from '../types';
import Header from '../components/header';
import Footer from '../components/footer';
import { fetch } from '../utils/sanity-fetch';
import { postFields } from '../utils/sanity-data';
import title from '../utils/title';

type IndexPageProps = {
	navigation: Navigation;
	settings: Settings;
	artworks: Artwork[];
};

const IndexPage: React.FC<IndexPageProps> = ({
	navigation,
	settings,
	artworks,
}) => {
	return (
		<>
			<Head>
				<title>{title('Artworks', settings.websiteName)}</title>
				<link rel="canonical" href={absoluteUrl('/artworks')} />
			</Head>
			<Header navigation={navigation} />
			{artworks && <PostsList title="Artworks" posts={artworks} />}
			<Footer links={settings.socialMedia} />
		</>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
	const [navigation, settings, artworks] = await Promise.all([
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
			query: `*[_type == "post" && type == "artwork"] | order(meta.date desc, _createdAt desc) { ${postFields} }`,
		}),
	]);

	return {
		props: {
			navigation,
			settings,
			artworks,
		},
		revalidate: 5,
	};
};
