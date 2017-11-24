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

const Footer = ({ title, email, links = [] }) => {
	const socialMediaLinks = links.map(link => (
		<ExternalLink to={link.url} title={link.title} key={link.url}>
			{link.label}
		</ExternalLink>
	));

	return (
		<FooterBlock>
			<Container>
				<MainItem>{title}</MainItem>
				<Item>
					Contact me on <a href={`mailto:${email}`}>{email}</a>.
				</Item>
				<Item>Also on {naturalJoin(socialMediaLinks)}.</Item>
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
