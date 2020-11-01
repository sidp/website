import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MarkdownPage from '../components/markdown-page';
import { Navigation, Page } from '../types';
import markdown from '../utils/markdown';
import apiGet from '../utils/api';
import ErrorPage404 from './404';
import styled from 'styled-components';
import { cubicBezierFadeIn } from '../styles/variables';
import Header from '../components/header';
import { absoluteUrl } from '../utils/url';

type PagePageProps = {
	navigation: Navigation;
	page: Page | null;
};

const PagePage: NextPage<PagePageProps> = ({ navigation, page }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!page) {
		return <ErrorPage404 />;
	}

	return (
		<>
			<Head>
				<link rel="canonical" href={absoluteUrl(`/${page.slug}`)} />
			</Head>
			<Header navigation={navigation} />
			<StyledMarkdownPage page={page} role="main" />
		</>
	);
};

export default PagePage;

export const getStaticProps: GetStaticProps<PagePageProps> = async (ctx) => {
	const [navigation, singlePage] = await Promise.all([
		apiGet<Navigation>('navigation'),
		apiGet<Page[]>('pages', {
			slug: ctx.params.slug,
			_limit: 1,
		}),
	]);

	const page = singlePage && singlePage[0] ? singlePage[0] : null;
	if (!page) {
		return {
			props: { navigation, page: null },
			revalidate: 1,
		};
	}

	if (typeof page.body === 'string') {
		page.body = markdown(page.body);
	}

	return {
		props: {
			navigation,
			page,
		},
		revalidate: 5,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await apiGet<Page[]>('pages');

	return {
		paths: pages
			.filter((page) => page.slug !== 'about')
			.map((page) => ({ params: { slug: page.slug } })),
		fallback: true,
	};
};

const StyledMarkdownPage = styled(MarkdownPage)`
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;
`;
