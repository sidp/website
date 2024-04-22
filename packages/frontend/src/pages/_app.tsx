import * as React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { absoluteUrl } from '../utils/url';

import '@fontsource/ia-writer-quattro/400.css';
import '@fontsource/ia-writer-quattro/400-italic.css';
import '@fontsource/ia-writer-quattro/700.css';
import '@fontsource/ia-writer-quattro/700-italic.css';
import '@fontsource/ia-writer-mono/400.css';
import '@fontsource/ia-writer-mono/400-italic.css';

import '../styles/globals.css';

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

	const content = (
		<>
			<Head>
				<meta name="og:image" content={absoluteUrl('/images/og-image.png')} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#000" />
				<link rel="icon" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/touch-icon.png" />
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
			<SpeedInsights />
			<Component {...pageProps} />
		</>
	);

	return draftMode ? (
		<PreviewProvider token={token}>{content}</PreviewProvider>
	) : (
		content
	);
}
