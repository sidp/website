import { FC } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Navigation, Settings } from '../types';
import { fetch } from '../utils/sanity-fetch';
import title from '../utils/title';
import Section from '../components/section';
import Footer from '../components/footer';
import Header from '../components/header';

type ErrorPage404Props = {
	navigation: Navigation;
	settings: Settings;
};

const ErrorPage404: FC<ErrorPage404Props> = ({ navigation, settings }) => {
	return (
		<>
			<Head>
				<title>{title('Page not found', settings.websiteName)}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<Header navigation={navigation} />
			<Section limitWidth>
				<h1>Page not found</h1>
				<p>The requested page could not be found.</p>
			</Section>

			<Footer links={settings.socialMedia} />
		</>
	);
};

export default ErrorPage404;

export const getStaticProps: GetStaticProps<ErrorPage404Props> = async () => {
	const [navigation, settings] = await Promise.all([
		fetch<Navigation>({
			draftMode: false,
			query: `*[_type == "navigation"][0]`,
		}),
		fetch<Settings>({
			draftMode: false,
			query: `*[_type == "settings"][0]`,
		}),
	]);

	return {
		props: {
			navigation,
			settings,
		},
		revalidate: 5,
	};
};
