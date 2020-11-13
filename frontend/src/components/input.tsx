import styled, { css } from 'styled-components';

export const general = css`
	appearance: none;
	border: 0.1rem solid var(--input-border);
	padding: 0.4rem 0.4rem 0.5rem;

	font-size: inherit;
	line-height: 1.3;
	font-family: var(--sans-serif-font-family);
`;

const Input = styled.input`
	${general};

	color: var(--input-color);
	background-color: var(--input-background);
	border-color: var(--input-border);

	&::placeholder {
		color: var(--grayed-color);
	}
`;

export default Input;
