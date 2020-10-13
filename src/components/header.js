import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { Container } from '../styles/components';
import { linkBoxShadow, fadeIn, cubicBezierFadeIn } from '../styles/variables';

const Header = ({ title, navigation = [], currentPath = '' }) => {
	return (
		<HeaderBlock role="banner">
			<Container>
				<HeaderWrapper>
					<Title>
						<Link to={'/'}>{title}</Link>
					</Title>
					<Navigation>
						{navigation.map((item) => (
							<NavLink
								to={item.path}
								selected={item.path === currentPath}
								key={item.path}
							>
								{item.label}
							</NavLink>
						))}
					</Navigation>
				</HeaderWrapper>
			</Container>
		</HeaderBlock>
	);
};

export default Header;

Header.propTypes = {
	title: PropTypes.string,
	navigation: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string, path: PropTypes.string })
	),
	currentPath: PropTypes.string,
};

/**
 * Styled components
 */

const HeaderBlock = styled.header`
	font-family: var(--sans-serif-font-family);
	padding-top: 1.2em;
	padding-bottom: 1.2em;

	transition-property: padding-top, padding-bottom, opacity;
	transition-duration: 100ms;
	transition-timing-function: ease-out;

	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;

	@media screen and (max-width: 639px) {
		padding-top: 0.65em;
		padding-bottom: 0.65em;
		position: relative;

		${Container} {
			padding-left: 0;
			padding-right: 0;
			overflow-x: auto;
			overflow-y: hidden;
		}

		&::after {
			content: '';
			position: absolute;
			top: 4px;
			right: 0;
			bottom: 0;
			z-index: 2;
			width: 1.2rem;
			background: linear-gradient(
				to right,
				rgba(255, 255, 255, 0),
				rgba(255, 255, 255, 1) 95%
			);

			@media (prefers-color-scheme: dark) {
				background: linear-gradient(
					to right,
					rgba(0, 0, 0, 0),
					var(--background-color) 95%
				);
			}
		}
	}
`;

const HeaderWrapper = styled.div`
	margin-top: 0.3rem;
	margin-bottom: 0.4rem;
	display: flex;
	align-items: baseline;
	justify-content: space-between;

	@media screen and (max-width: 639px) {
		padding-left: 1.2rem;
		padding-right: 1.2rem;
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

const Navigation = styled.nav`
	line-height: 1.5;
`;

const NavLink = styled(Link)`
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
