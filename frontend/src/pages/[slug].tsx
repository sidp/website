import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import MarkdownPage from '../components/markdown-page';
import { Page } from '../types';
import markdown from '../utils/markdown';
import apiGet from '../utils/api';
import ErrorPage404 from './404';
import styled from 'styled-components';
import { cubicBezierFadeIn } from '../styles/variables';

type PagePageProps = {
	page: Page | null;
};

const PagePage: NextPage<PagePageProps> = ({ page }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!page) {
		return <ErrorPage404 />;
	}

	return <StyledMarkdownPage page={page} role="main" />;
};

export default PagePage;

export const getStaticProps: GetStaticProps<PagePageProps> = async (ctx) => {
	const page = await apiGet<Page[]>('pages', {
		slug: ctx.params.slug,
		_limit: 1,
	});

	if (page[0] && typeof page[0].body === 'string') {
		page[0].body = markdown(page[0].body);
	}

	return {
		props: {
			page: page[0] ?? null,
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
