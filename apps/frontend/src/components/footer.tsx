import React from 'react';
import cx from '../utils/cx';
import naturalJoin from '../utils/natural-join';
import ExternalLink from './external-link';

type FooterProps = {
	links?: {
		_key: string;
		url?: string;
		label?: string;
		title?: string;
		rel?: string;
	}[];
};

const Footer: React.FC<FooterProps> = ({ links = [] }) => {
	const socialMediaLinks = links.filter(isLink).map((link) => (
		<ExternalLink
			href={link.url}
			title={link.title}
			rel={link.rel}
			className="underline underline-offset-4"
			key={link._key}
		>
			{link.label}
		</ExternalLink>
	));

	const flexClassNames = 'flex justify-between flex-wrap gap-x-5 gap-y-3';
	const email = 'peter@simonsson.com';

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

const isLink = (
	item: unknown,
): item is {
	_key: string;
	url: string;
	label: string;
	title?: string;
	rel?: string;
} => {
	return (
		typeof item === 'object' &&
		item !== null &&
		'_key' in item &&
		'url' in item &&
		'label' in item
	);
};
