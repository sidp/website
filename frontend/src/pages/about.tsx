import React, { Component } from 'react';
import styled from 'styled-components';
import MarkdownPage from '../components/markdown-page';
import { fadeIn, cubicBezierFadeIn, imageBoxShadow } from '../styles/variables';
import Columns, { Column } from '../components/columns';
import { Page } from '../types';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import apiGet from '../utils/api';
import markdown from '../utils/markdown';
import ErrorPage404 from './404';

type AboutPageProps = { page: Page | null };

const AboutPage: React.FC<AboutPageProps> = ({ page }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!page) {
		return <ErrorPage404 />;
	}

	return (
		<Columns as="article" role="main">
			<Column span={{ '<small': 12, '>small': 4, '>medium': 5 }}>
				<Portrait src="/images/peter.jpg" alt="Peter Simonsson" />
			</Column>
			<Column span={{ '<small': 12, '>small': 8, '>medium': 7 }}>
				<Content page={page} htmlElement="div" />
			</Column>
		</Columns>
	);
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async (ctx) => {
	const page = await apiGet<Page[]>('pages', {
		slug: 'about',
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

/**
 * Styled components
 */

const Portrait = styled.img`
	max-width: 100%;
	width: 600px;
	height: auto;
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
	margin-bottom: 0;
	float: left;

	box-shadow: ${imageBoxShadow};
`;

/**
 * todo: this approach leads to specificity conflict, hence the && hack.
 * A simpler solution here would be prefered.
 */
const Content = styled(MarkdownPage)`
	&& {
		margin-top: 0;
	}
	animation: fadeIn 400ms 100ms ${cubicBezierFadeIn} both;
`;
