import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyles from '../styles/global';
import { Container } from '../styles/components';
import Footer from '../components/footer';
import { absoluteUrl } from '../utils/url';

import dynamic from 'next/dynamic';

const PreviewProvider = dynamic(() => import('../components/preview-provider'));

export default function App(
	props: AppProps<{
		draftMode: boolean;
		token: string;
	}>,
) {
	const { Component, pageProps } = props;
	const { draftMode, token } = pageProps;

	const title = 'Peter Simonsson';
	const email = 'peter@simonsson.com';

	const socialMediaLinks = [
		{
			label: 'Twitter',
			title: '@sidp on Twitter',
			url: 'https://twitter.com/sidp',
			rel: 'me',
		},
		{
			label: 'GitHub',
			title: '@sidp on GitHub',
			url: 'https://github.com/sidp',
			rel: 'me',
		},
		{
			label: 'LinkedIn',
			title: 'Peter Simonsson on LinkedIn',
			url: 'https://www.linkedin.com/in/sidp86',
			rel: 'me',
		},
		{
			label: 'Instagram',
			title: '@sidp on Instagram',
			url: 'https://www.instagram.com/sidp/',
			rel: 'me',
		},
		{
			label: 'Mastodon',
			title: 'sidp on Mastodon',
			url: 'https://mastodon.social/@sidp',
			rel: 'me',
		},
		{
			label: 'Last.fm',
			title: 'sidp on Last.fm',
			url: 'http://www.last.fm/user/sidp',
			rel: 'me',
		},
	];

	const content = (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="webmention" href={absoluteUrl('/webmention')} />
				<link
					rel="alternate"
					type="application/atom+xml"
					title="Atom Feed"
					href="/feed/atom"
				/>
				<link
					rel="alternate"
					type="application/feed+json"
					title="JSON Feed"
					href="/feed/json"
				/>
			</Head>
			<GlobalStyles />
			<Container>
				<Component {...pageProps} />
			</Container>
			<Footer title={title} email={email} links={socialMediaLinks} />
		</>
	);

	return draftMode ? (
		<PreviewProvider token={token}>content</PreviewProvider>
	) : (
		content
	);
}
