import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

import { siteMetadata } from '../../gatsby-config';
import ExternalLink from './external-link';

import { Container } from '../styles/components';
import {
	textColor,
	linkColor,
	linkColorHover,
	linkColorActive,
	sansSerifFontFamily,
	linkBoxShadow,
	fadeIn,
	cubicBezierFadeIn,
} from '../styles/variables';

const navigation = siteMetadata.navigation || [];

const Header = ({ currentPath = '' }) => (
	<HeaderBlock role="banner">
		<Container>
			<HeaderWrapper>
				<Title>
					<Link to={'/'}>Peter Simonsson</Link>
				</Title>
				<Navigation>
					{navigation.map(item => (
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

Header.propTypes = {
	currentPath: PropTypes.string,
};

export default Header;

/**
 * Styled components
 */

const HeaderBlock = styled.header`
	font-family: ${sansSerifFontFamily};
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
		}
	}
`;

const HeaderWrapper = styled.div`
	margin-top: 0.3rem;
	margin-bottom: 0.4rem;
	display: flex;
	align-items: baseline;
	justify-content: space-between;

	& .title,
	& .navigation {
	}

	& .title {
		margin-bottom: 0;
	}
`;

const Title = styled.h1`
	font-size: 1.1rem;
	margin-top: 0;
	letter-spacing: 0;
	line-height: 1.5;

	a {
		color: ${textColor};
		text-decoration: none;
		box-shadow: none;

		&:hover {
			color: ${textColor};
		}
	}
`;

const Navigation = styled.nav`
	line-height: 1.5;
`;

const NavLink = styled(Link)`
	color: ${linkColor};
	box-shadow: ${linkBoxShadow};

	${props =>
		props.selected
			? `
				color: ${textColor};
				cursor: default;
			`
			: ''};

	&:hover {
		color: ${linkColorHover};
	}

	&:active {
		color: ${linkColorActive};
	}

	&:not(:last-of-type) {
		margin-right: 1em;

		@media (min-width: 360px) {
			margin-right: 1.8em;
		}
	}
`;
