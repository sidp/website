import React from 'react';
import styled from 'styled-components';
import ExternalLink from './external-link';
import { cubicBezierFadeIn } from '../styles/variables';

const Intro = () => (
	<Block>
		<p>
			Hi! I’m a freelance web developer and designer. Have a look at some of the
			most popular project I’ve worked on below, and{' '}
			<a href="mailto:peter@simonsson.com">contact me</a> if you want to talk
			further.
		</p>
	</Block>
);

export default Intro;

/**
 * Styled components
 */

const Block = styled.div`
	min-height: calc(100vh - 210px); /* estimated header height */
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-top: 0.75rem;
	padding-bottom: 1.5rem;
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;

	& > p {
		font-size: 1.4rem;
		line-height: 1.5;
		max-width: 33em;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}

	@media (max-width: 399px) {
		& > p {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 499px) {
		min-height: 56vw;

		& > p {
			text-align: left;
		}
	}
`;
