import dayjs from 'dayjs';
import Head from 'next/head';
import React, { HTMLAttributes } from 'react';
import { TextWrapper } from '../styles/components';
import { Page } from '../types';
import PostDetails from './post-details';

type MarkdownPageProps = HTMLAttributes<HTMLElement> & {
	page: Page;
	htmlElement?: 'article' | 'div';
	render?: (args: {
		title: React.ReactNode;
		body: React.ReactNode;
	}) => JSX.Element;
	showDate?: boolean;
};

const renderBody = ({ title, body }) => (
	<>
		{title}
		{body}
	</>
);

const MarkdownPage: React.FC<MarkdownPageProps> = ({
	page,
	htmlElement = 'article',
	render = renderBody,
	showDate,
	children,
	...props
}) => {
	const postedOn = dayjs(page.created_at).format('MMMM D, YYYY');
	const date = (
		<time dateTime={page.created_at} className="dt-published">
			{postedOn}
		</time>
	);

	return (
		<TextWrapper as={htmlElement} className="h-entry" {...props}>
			<Head>
				<title>{page.title}</title>
				{page.description && (
					<meta
						name="description"
						content={page.description}
						key="description"
					/>
				)}
			</Head>
			{render({
				title: <h1 className="p-name">{page.heading || page.title}</h1>,
				body: (
					<div
						className="e-content"
						dangerouslySetInnerHTML={{ __html: page.body }}
					/>
				),
			})}
			{showDate && <PostDetails>Published on {date}</PostDetails>}
		</TextWrapper>
	);
};

export default MarkdownPage;
