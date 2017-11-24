import React from 'react';
import styled from 'styled-components';

import naturalJoin from '../utils/natural-join';
import ExternalLink from './external-link';

import {
	textColor,
	linkColor,
	linkColorHover,
	linkColorActive,
	accentColor,
	metaFontSize,
	metaFontFamily,
	linkBoxShadow,
} from '../styles/variables';
import { Container } from '../styles/components';

const Footer = () => {
	let links = [
		{
			label: 'Twitter',
			title: '@sidp on Twitter',
			url: 'https://twitter.com/sidp',
		},
		{
			label: 'GitHub',
			title: '@sidp on GitHub',
			url: 'https://github.com/sidp',
		},
		{
			label: 'LinkedIn',
			title: 'Peter Simonsson on LinkedIn',
			url: 'https://www.linkedin.com/in/sidp86',
		},
		{
			label: 'Instagram',
			title: '@sidp on Instagram',
			url: 'https://www.instagram.com/sidp/',
		},
		{
			label: 'Last.fm',
			title: 'sidp on Last.fm',
			url: 'http://www.last.fm/user/sidp',
		},
	].map(link => (
		<ExternalLink to={link.url} title={link.title} key={link.url}>
			{link.label}
		</ExternalLink>
	));

	return (
		<FooterBlock>
			<Container>
				<MainItem>Peter Simonsson</MainItem>
				<Item>
					Contact me on{' '}
					<a href="mailto:peter@simonsson.com">peter@simonsson.com</a>.
				</Item>
				<Item>Also on {naturalJoin(links)}.</Item>
				<Item>
					Check out this site on{' '}
					<ExternalLink to="https://github.com/sidp/portfolio">
						GitHub
					</ExternalLink>.
				</Item>
			</Container>
		</FooterBlock>
	);
};

export default Footer;

/**
 * Styled components
 */

const FooterBlock = styled.footer`
	text-shadow: rgba(255, 255, 255, 0.5) 0 1px 0;
	padding-top: 2rem;
	padding-bottom: 2rem;
	line-height: 1.4;
	border-top: ${accentColor} solid 2px;
	font-size: ${metaFontSize};
	font-family: ${metaFontFamily};
`;

const Item = styled.span`
	display: inline-block;
	break-inside: avoid;
	margin-bottom: 0.5rem;

	&:not(:last-child) {
		margin-right: 1em;
	}

	& > a {
		color: ${textColor};
		box-shadow: ${linkBoxShadow} ${linkColor};

		&:hover {
			color: ${linkColorHover};
		}

		&:active {
			color: ${linkColorActive};
		}
	}
`;

const MainItem = Item.extend`
	font-weight: 600;
`;
