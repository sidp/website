import styled, { css } from 'styled-components';
import { general } from './input';

type ButtonProps = {
	primary?: boolean;
};

const Button = styled.button<ButtonProps>`
	${general};

	/*cursor: pointer;*/

	padding-left: 0.75rem;
	padding-right: 0.75rem;

	color: var(--button-color);
	background-color: var(--button-background);
	border-color: var(--button-border);

	${(props) =>
		!props.primary
			? css`
					color: var(--link-color);
					background-color: transparent;
					border-color: transparent;
					text-decoration: underline;
			  `
			: ''}
`;

export default Button;
