import styled from 'styled-components';
import { contentWidth, paleAccentColor } from './variables';

export const Container = styled.div`
	max-width: 1440px;
	margin-left: auto;
	margin-right: auto;

	padding-left: 1.2rem;
	padding-right: 1.2rem;

	transition-property: padding-left, padding-right;
	transition-duration: 100ms;
	transition-timing-function: ease-out;

	@media screen and (min-width: 639px) {
		padding-left: 1.8rem;
		padding-right: 1.8rem;
	}
`;

export const InnerContainer = styled.div`
	background-color: ${paleAccentColor};
	position: relative;

	margin-top: 2rem;
	margin-bottom: 2rem;
	margin-left: -10px;
	margin-right: -10px;
	padding-left: 10px;
	padding-right: 10px;

	&::before,
	&::after {
		content: '';
		background-color: inherit;

		position: absolute;
		top: 0;
		bottom: 0;
		width: 50vw;
	}

	&::before {
		right: 100%;
	}

	&::after {
		left: 100%;
	}
`;

export const TextWrapper = styled.div`
	max-width: ${contentWidth};
	margin: 2rem auto 4.5rem;
`;
