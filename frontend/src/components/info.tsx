import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { metaFontFamily, metaFontSize, textColor } from '../styles/variables';

type InfoProps = {};

const Info: React.FC<InfoProps> = ({ children }) => {
	const [hover, setHover] = React.useState(true);
	const el = React.useRef<SVGElement>();

	return (
		<Block
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onFocus={() => setHover(true)}
			onBlur={() => {
				if (el.current && el.current.contains(document.activeElement)) {
					return;
				}
				setHover(false);
			}}
		>
			<svg
				width="14"
				height="14"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 14 14"
				tabIndex={0}
				ref={el}
			>
				<title>Info</title>
				<path
					d="M7 0c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7zm-.35474 5.54834c-.23632 0-.48698.04207-.75195.12622-.17665.0561-.35887.11976-.54666.19097l-.28586.1125-.11816.4834c.08593-.03223.18888-.06625.30883-.10206.11996-.0358.23723-.0537.35181-.0537.23275 0 .3903.03938.47266.11816.08235.07877.12353.21842.12353.41894 0 .111-.01342.23365-.04028.36792l-.04498.20746-.05439.21955-.44043 1.56835c-.03938.16472-.06803.31242-.08593.44312-.0179.1307-.02686.2587-.02686.38403 0 .32227.11906.58814.35718.79761.23812.20947.57202.31421 1.0017.31421.2793 0 .52459-.0367.73585-.1101.169-.05873.38385-.13865.64453-.23977l.2041-.07982.11817-.4834c-.06088.02865-.15935.06177-.29541.09937-.13607.0376-.25782.0564-.36524.0564-.22917 0-.3903-.0376-.4834-.1128-.0931-.0752-.13965-.21663-.13965-.42431 0-.08236.01433-.2041.04297-.36524.0191-.10742.03979-.20689.06207-.2984l.03461-.13129.44043-1.56298c.04297-.14323.07251-.30079.08863-.47266.0161-.17188.02416-.29183.02416-.35986 0-.32943-.11547-.59709-.34643-.80298-.23096-.2059-.55949-.30884-.9856-.30884zm.98291-2.8628c-.29004 0-.5389.09669-.74658.29005-.20768.19336-.31152.4261-.31152.69824 0 .27213.10384.50399.31152.69555.20768.19157.45654.28736.74658.28736s.538-.09579.7439-.28736c.2059-.19156.30884-.42342.30884-.69555 0-.27214-.10295-.50488-.30884-.69824-.2059-.19336-.45386-.29004-.7439-.29004z"
					fill="currentColor"
				/>
			</svg>
			{hover && <Box>{children}</Box>}
		</Block>
	);
};

export default Info;

const Block = styled.span`
	display: inline-block;
	position: relative;
	height: 0.7rem;
	vertical-align: 0;

	svg {
		width: 0.7rem;
		height: 0.7rem;
	}
`;

const boxAppear = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const boxMove = keyframes`
	0% {
		transform: translateX(-50%) translateY(-0.5rem) scale(0.4);
	}
	100% {
		transform: translateX(-50%) translateY(0) scale(1);
	}
`;

const getSvg = (color: string) =>
	`data:image/svg+xml;utf8,<svg width="19" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M0 9l9.5-9L19 9z" fill="${color.replace(
		'#',
		'%23'
	)}"/></svg>`;

const Box = styled.span`
	position: absolute;
	top: calc(100% + 0.85rem);
	left: 50%;
	transform: translateX(-50%);
	transform-origin: top center;
	min-width: 6rem;
	max-width: 14rem;

	font-family: ${metaFontFamily};
	font-size: ${metaFontSize};
	font-weight: normal;
	line-height: 1.2;

	color: var(--background-color);
	background-color: var(--text-color);
	padding: 0.4rem 0.6rem;
	border-radius: 0.3rem;
	box-shadow: rgba(0, 0, 0, 0.25) 0 0.2rem 0.6rem;

	animation: ${boxAppear} 150ms linear 150ms both,
		${boxMove} 150ms cubic-bezier(0.2, 0.77, 0.28, 1) 150ms both;

	a {
		text-decoration: underline;
	}

	&::before {
		content: '';
		display: block;
		width: 1rem;
		height: 0.7rem;
		position: absolute;
		top: -0.6rem;
		left: 50%;
		transform: translateX(-50%);

		background-image: url('${getSvg(textColor)}');
		background-size: 1rem 0.5rem;
		background-position: center bottom;
		background-repeat: no-repeat;

		@media (prefers-color-scheme: dark) {
			background-image: url('${getSvg('#fff')}');
		}
	}
`;
