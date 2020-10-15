import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Columns, { Column } from './columns';
import { fadeIn, cubicBezierFadeIn, metaFontSize } from '../styles/variables';
import { Note } from '../types';
import dayjs from 'dayjs';

type NotesListProps = {
	title?: string;
	notes: Note[];
};

const NotesList: React.FC<NotesListProps> = ({ title = '', notes }) => {
	return (
		<Block>
			{title && <Title>{title}</Title>}

			<Columns className="h-feed">
				{notes.map((note) => {
					const postedOn = dayjs(note.created_at).format('MMMM D, YYYY');

					const date = (
						<time dateTime={note.created_at} className="dt-published">
							{postedOn}
						</time>
					);

					const renderBody = () => {
						const body = (
							<>
								<NoteTitle className="p-name">{note.title}</NoteTitle>
								<Body dangerouslySetInnerHTML={{ __html: note.body }} />
							</>
						);

						if (note.link) {
							return (
								<StyledLink href={note.link} target="_blank" rel="noopener">
									{body}
								</StyledLink>
							);
						}

						return body;
					};

					return (
						<AnimatedColumn
							span={{ '<small': 12, '>small': 6, '>medium': 4 }}
							key={note.slug}
						>
							<div className="h-entry">
								{renderBody()}
								<Meta>
									<Link
										href="/notes/[slug]"
										as={`/notes/${note.slug}`}
										passHref
									>
										<StyledLink className="u-url">{date}</StyledLink>
									</Link>
								</Meta>
							</div>
						</AnimatedColumn>
					);
				})}
			</Columns>
		</Block>
	);
};

export default NotesList;

/**
 * Styled components
 */

const Block = styled.div`
	&:not(:first-child) {
		margin-top: 3rem;
	}

	&:not(:last-child) {
		margin-bottom: 5rem;
	}
`;

const Title = styled.h2`
	margin-top: 0;
	margin-bottom: 0.75rem;
	animation: ${fadeIn} 400ms 100ms ${cubicBezierFadeIn} both;
`;

let animationDelaySequence = '';
for (let i = 0; i < 12; i += 1) {
	animationDelaySequence += `
		&:nth-child(1n+${i}) { animation-delay: ${100 + 60 * i}ms; }
	`;
}

const AnimatedColumn = styled(Column)`
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
	${animationDelaySequence};
`;

const StyledLink = styled.a`
	color: inherit;
	display: inline-block;
	box-shadow: none;

	&:hover,
	&:active {
		color: inherit;
	}
`;

const NoteTitle = styled.h3`
	font-size: 1.1rem;
	font-weight: 600;
	margin-top: 0.25rem;
	margin-bottom: 0.45rem;
`;

const Meta = styled.p`
	color: var(--grayed-color);
	font-size: ${metaFontSize};
	font-family: var(--sans-serif-font-family);
	margin-top: 0;
	margin-bottom: 0;
`;

const Body = styled.div`
	margin-top: 0.15rem;
	margin-bottom: 0.35rem;
	font-size: 0.85rem;

	p:last-child {
		margin-bottom: 0;
	}
`;
