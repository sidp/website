import React from 'react';
import naturalJoin from '../utils/natural-join';
import ExternalLink from './external-link';
import { Container } from '../styles/components';

type FooterProps = {
	title: string;
	email: string;
	links: { url: string; label: string; title?: string; rel?: string }[];
};

const Footer: React.FC<FooterProps> = ({ title, email, links = [] }) => {
	const socialMediaLinks = links.map((link) => (
		<ExternalLink
			href={link.url}
			title={link.title}
			rel={link.rel}
			key={link.url}
		>
			{link.label}
		</ExternalLink>
	));

	return (
		<Container>
			<div>{title}</div>
			<div>
				Contact me on <a href={`mailto:${email}`}>{email}</a>.
			</div>
			<div>Also on {naturalJoin(socialMediaLinks)}.</div>
			<div>
				Check out this site on{' '}
				<ExternalLink href="https://github.com/sidp/website">
					GitHub
				</ExternalLink>
				.
			</div>
		</Container>
	);
};

export default Footer;
