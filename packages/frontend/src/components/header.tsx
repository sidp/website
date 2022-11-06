import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { linkBoxShadow, fadeIn, cubicBezierFadeIn } from '../styles/variables';
import { Navigation } from '../types';

type HeaderProps = {
	navigation: Navigation;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
	const router = useRouter();
	const [shouldAnimate, setShouldAnimate] = React.useState(true);

	React.useEffect(() => {
		setShouldAnimate(!(window as any).__has_loaded);
		(window as any).__has_loaded = true;
	}, []);

	return (
		<HeaderBlock role="banner" animateIn={shouldAnimate}>
			<HeaderWrapper>
				<Title>
					<Link href="/">
						<a>Peter Simonsson</a>
					</Link>
				</Title>
				<Nav>
					{navigation.links.map((item) => (
						<Link href={item.href} as={item.as} passHref key={item.label}>
							<NavLink
								selected={
									item.href === router.pathname || item.as === router.asPath
								}
							>
								{item.label}
							</NavLink>
						</Link>
					))}
				</Nav>
			</HeaderWrapper>
		</HeaderBlock>
	);
};

export default Header;

/**
 * Styled components
 */

const HeaderBlock = styled.header<{ animateIn: boolean }>`
	font-family: var(--sans-serif-font-family);
	padding-top: 1.2em;
	padding-bottom: 1.2em;

	transition-property: padding-top, padding-bottom, opacity;
	transition-duration: 100ms;
	transition-timing-function: ease-out;

	${(props) =>
		props.animateIn
			? css`
					animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
			  `
			: ''}

	@media screen and (max-width: 639px) {
		padding-top: 0.65em;
		padding-bottom: 0.65em;
		position: relative;
	}
`;

const HeaderWrapper = styled.div`
	margin-top: 0.3rem;
	margin-bottom: 0.4rem;
	display: flex;
	align-items: baseline;
	justify-content: space-between;

	@media screen and (max-width: 639px) {
		min-width: min-content;
	}
`;

const Title = styled.h1`
	font-size: 1.1rem;
	margin-top: 0;
	margin-bottom: 0;
	margin-right: 1rem;
	letter-spacing: 0;
	line-height: 1.5;

	a {
		color: var(--text-color);
		text-decoration: none;
		box-shadow: none;
		white-space: nowrap;

		&:hover {
			color: var(--text-color);
		}
	}
`;

const Nav = styled.nav`
	line-height: 1.5;
`;

const NavLink = styled.a<{ selected: boolean }>`
	color: var(--link-color);
	box-shadow: ${linkBoxShadow};

	${(props) =>
		props.selected
			? css`
					color: var(--text-color);
					cursor: default;
					box-shadow: none;
			  `
			: ''};

	&:hover {
		color: ${(props) =>
			props.selected ? 'var(--text-color)' : 'var(--link-color--hover)'};
	}

	&:active {
		color: var(--link-color--active);
	}

	&:not(:last-of-type) {
		margin-right: 1em;

		@media (min-width: 400px) {
			margin-right: 1.8em;
		}
	}
`;
