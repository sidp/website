import * as React from 'react';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '../components/header';
import { Navigation, Settings } from '../types';
import { fetch } from '../utils/sanity-fetch';
import Footer from '../components/footer';

import '@fontsource/ia-writer-quattro/400.css';
import '@fontsource/ia-writer-quattro/400-italic.css';
import '@fontsource/ia-writer-quattro/700.css';
import '@fontsource/ia-writer-quattro/700-italic.css';
import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-mono/400-italic.css';

import '../styles/globals.css';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	themeColor: '#000',
	colorScheme: 'dark',
};

export const metadata: Metadata = {
	metadataBase: new URL('https://simonsson.com'),
	icons: [
		{ rel: 'icon', url: '/favicon.png' },
		{ rel: 'apple-touch-icon', url: '/touch-icon.png' },
	],
	openGraph: {
		images: '/images/og-image.png',
	},
	alternates: {
		types: {
			'application/atom+xml': '/feed/atom',
			'application/feed+json': '/feed/json',
		},
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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

	return (
		<html lang="en">
			<SpeedInsights />
			<Script defer data-domain="simonsson.com" src="/js/script.js" />
			<body className="font-sans leading-relaxed text-sm bg-black text-white antialiased">
				<Header navigation={navigation} />
				{children}
				<Footer links={settings.socialMedia} />
			</body>
		</html>
	);
}
