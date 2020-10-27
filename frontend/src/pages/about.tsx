import React, { Component } from 'react';
import styled from 'styled-components';
import MarkdownPage from '../components/markdown-page';
import { fadeIn, cubicBezierFadeIn, imageBoxShadow } from '../styles/variables';
import Columns, { Column } from '../components/columns';
import { Navigation, Page } from '../types';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import apiGet from '../utils/api';
import markdown from '../utils/markdown';
import ErrorPage404 from './404';
import Header from '../components/header';

type AboutPageProps = {
	navigation: Navigation;
	page: Page | null;
};

const AboutPage: React.FC<AboutPageProps> = ({ navigation, page }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!page) {
		return <ErrorPage404 />;
	}

	return (
		<>
			<Header navigation={navigation} />
			<Columns as="article" role="main">
				<Column span={{ '<small': 12, '>small': 4, '>medium': 5 }}>
					<Portrait
						src="/images/peter.jpg"
						width="1200"
						height="1200"
						alt="Peter Simonsson"
						sizes="(min-width: 800px) 33vw, (min-width: 500px) 50vw, 95vw"
						loading="eager"
						priority
					/>
				</Column>
				<Column span={{ '<small': 12, '>small': 8, '>medium': 7 }}>
					<Content page={page} htmlElement="div" />
				</Column>
			</Columns>
		</>
	);
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async (ctx) => {
	const [navigation, singlePage] = await Promise.all([
		apiGet<Navigation>('navigation'),
		apiGet<Page[]>('pages', {
			slug: 'about',
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
			page: page,
		},
		revalidate: 5,
	};
};

/**
 * Styled components
 */

const Portrait = styled(Image)`
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
