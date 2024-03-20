import React from 'react';
import naturalJoin from '../utils/natural-join';
import ExternalLink from './external-link';
import cx from '../utils/cx';

type FooterProps = {
	email: string;
	links: { url: string; label: string; title?: string; rel?: string }[];
};

const Footer: React.FC<FooterProps> = ({ email, links = [] }) => {
	const socialMediaLinks = links.map((link) => (
		<ExternalLink
			href={link.url}
			title={link.title}
			rel={link.rel}
			key={link.url}
			className="underline underline-offset-4"
		>
			{link.label}
		</ExternalLink>
	));

	const flexClassNames = 'flex justify-between flex-wrap gap-x-5 gap-y-3';

	return (
		<footer
			className={cx(
				'border-t border-dotted border-current px-4 py-3 pb-4 leading-normal',
				flexClassNames,
			)}
		>
			<div className={flexClassNames}>
				<div className="whitespace-nowrap max-w-full">
					Contact me on{' '}
					<a href={`mailto:${email}`} className="underline underline-offset-4">
						{email}
					</a>
					.
				</div>
				<div>Also on {naturalJoin(socialMediaLinks)}.</div>
			</div>
			<div>
				Check out this site on{' '}
				<ExternalLink
					href="https://github.com/sidp/website"
					className="underline underline-offset-4"
				>
					GitHub
				</ExternalLink>
				.
			</div>
		</footer>
	);
};

export default Footer;
