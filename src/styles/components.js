import styled from 'styled-components';
import { contentWidth } from './variables';

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

export const TextWrapper = styled.div`
	max-width: ${contentWidth};
	margin: 2rem auto 4.5rem;
`;
