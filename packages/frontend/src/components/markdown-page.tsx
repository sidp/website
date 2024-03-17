import dayjs from 'dayjs';
import Head from 'next/head';
import React, { HTMLAttributes } from 'react';
import { TextWrapper } from '../styles/components';
import { Page } from '../types';
import title from '../utils/title';
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
	const postedOn = dayjs(page._createdAt);
	const updatedOn = dayjs(page._updatedAt);
	const wasUpdated = !postedOn.isSame(updatedOn, 'day');

	return (
		<TextWrapper as={htmlElement} className="h-entry" {...props}>
			<Head>
				<title>{title(page.title)}</title>
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
			{showDate && (
				<PostDetails>
					Published on{' '}
					<time dateTime={page.created_at} className="dt-published">
						{postedOn.format('MMMM D, YYYY')}
					</time>
					.
					{wasUpdated && (
						<>
							{' '}
							Last update on{' '}
							<time dateTime={page.created_at} className="dt-published">
								{updatedOn.format('MMMM D, YYYY')}
							</time>
							.
						</>
					)}
				</PostDetails>
			)}
		</TextWrapper>
	);
};

export default MarkdownPage;
