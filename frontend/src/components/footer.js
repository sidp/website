import React from 'react';
import styled from 'styled-components';
import naturalJoin from '../utils/natural-join';
import ExternalLink from './external-link';
import {
	metaFontSize,
	metaFontFamily,
	linkBoxShadow,
} from '../styles/variables';
import { Container } from '../styles/components';

const Footer = ({ title, email, links = [] }) => {
	const socialMediaLinks = links.map(link => (
		<ExternalLink
			to={link.url}
			title={link.title}
			rel={link.rel}
			key={link.url}
		>
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
					</ExternalLink>
					.
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
	margin-top: 2rem;
	padding-top: 2rem;
	padding-bottom: 2rem;
	line-height: 1.4;
	border-top: var(--accent-color) solid 2px;
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
		color: var(--text-color);
		box-shadow: ${linkBoxShadow} var(--link-color);

		&:hover {
			color: var(--link-color--hover);
		}

		&:active {
			color: var(--link-color--active);
		}
	}
`;

const MainItem = styled(Item)`
	font-weight: 600;
`;
