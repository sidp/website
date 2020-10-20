import * as React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import MarkdownPage from '../../components/markdown-page';
import { Note } from '../../types';
import markdown from '../../utils/markdown';
import apiGet from '../../utils/api';
import ErrorPage404 from '../404';
import styled from 'styled-components';
import { cubicBezierFadeIn } from '../../styles/variables';
import NotesList from '../../components/notes-list';
import MentionsList from '../../components/mentions-list';

type NotePageProps = {
	note: Note | null;
	notes: Note[];
};

const NotePage: NextPage<NotePageProps> = ({ note, notes }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!note) {
		return <ErrorPage404 />;
	}

	return (
		<>
			<StyledMarkdownPage page={note} role="main" showDate />
			{note.mentions && <MentionsList mentions={note.mentions} />}
			<NotesList notes={notes} />
		</>
	);
};

export default NotePage;

export const getStaticProps: GetStaticProps<NotePageProps> = async (ctx) => {
	const [note, notes] = await Promise.all([
		apiGet<Note[]>('notes', {
			slug: ctx.params.slug,
			_limit: 1,
		}),
		apiGet<Note[]>('notes', {
			slug_ne: ctx.params.slug,
			_sort: 'created_at:DESC',
			_limit: 16,
		}),
	]);

	if (note[0] && typeof note[0].body === 'string') {
		note[0].body = markdown(note[0].body);
	}

	return {
		props: {
			note: note[0] ?? null,
			notes,
		},
		revalidate: 5,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const notes = await apiGet<Note[]>('notes');

	return {
		paths: notes.map((note) => ({ params: { slug: note.slug } })),
		fallback: true,
	};
};

const StyledMarkdownPage = styled(MarkdownPage)`
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;
`;
