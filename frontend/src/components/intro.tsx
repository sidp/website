import React from 'react';
import styled from 'styled-components';
import { cubicBezierFadeIn } from '../styles/variables';

const Intro = styled.div`
	min-height: 25vmin;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	text-align: left;
	flex-direction: column;
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;

	& > p {
		font-size: 1.4rem;
		line-height: 1.5;
		max-width: 33em;
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

export default Intro;
