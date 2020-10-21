import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import GlobalStyles from '../styles/global';
import { Container } from '../styles/components';
import Footer from '../components/footer';
import { absoluteUrl } from '../utils/url';

import '../styles/markdown-styles.css';
import 'typeface-source-sans-pro';
import 'typeface-source-serif-pro';

type AppProps = {};

export default class CustomApp extends App<AppProps, {}> {
	render() {
		const { Component, pageProps } = this.props;

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
				label: 'Last.fm',
				title: 'sidp on Last.fm',
				url: 'http://www.last.fm/user/sidp',
				rel: 'me',
			},
		];

		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="webmention" href={absoluteUrl('/webmention')} />
				</Head>
				<GlobalStyles />
				<Container>
					<Component {...pageProps} />
				</Container>
				<Footer title={title} email={email} links={socialMediaLinks} />
			</>
		);
	}
}
