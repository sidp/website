import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { defineQuery } from 'next-sanity';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import * as React from 'react';
import DisableDraftMode from '../components/disable-draft-mode';
import Footer from '../components/footer';
import Header from '../components/header';
import { fetch } from '../utils/sanity-fetch';

import '@fontsource/ia-writer-mono/400-italic.css';
import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-quattro/400-italic.css';
import '@fontsource/ia-writer-quattro/400.css';
import '@fontsource/ia-writer-quattro/700-italic.css';
import '@fontsource/ia-writer-quattro/700.css';

import '../styles/globals.css';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	themeColor: '#000',
	colorScheme: 'dark',
};

export const metadata: Metadata = {
	title: {
		template: '%s – Peter Simonsson',
		default: 'Peter Simonsson',
	},
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
	const navigationQuery = defineQuery(`
		*[_type == "navigation"][0]
	`);
	const layoutSettingsQuery = defineQuery(`
		*[_type == "settings"][0] { socialMedia }
	`);

	const [navigation, settings] = await Promise.all([
		fetch(navigationQuery, { tags: ['navigation'] }),
		fetch(layoutSettingsQuery, { tags: ['settings'] }),
	]);

	const { isEnabled } = await draftMode();

	return (
		<html lang="en">
			<SpeedInsights />
			{/* @ts-ignore */}
			<Script data-domain="simonsson.com" src="/js/script.js" />
			<body className="font-sans leading-relaxed text-sm bg-black text-white antialiased">
				{navigation && <Header navigation={navigation} />}
				{children}
				<Footer links={settings?.socialMedia || undefined} />
				{isEnabled && (
					<>
						<VisualEditing />
						<DisableDraftMode />
					</>
				)}
			</body>
		</html>
	);
}
