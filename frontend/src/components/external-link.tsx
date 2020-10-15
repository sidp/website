import React from 'react';

type ExternalLinkProps = React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> & { href: string; rel?: string };

const ExternalLink: React.FC<ExternalLinkProps> = ({
	href,
	rel = '',
	children,
	...props
}) => (
	// eslint-disable-next-line react/jsx-no-target-blank
	<a {...props} href={href} target="_blank" rel={`noopener noreferrer ${rel}`}>
		{children}
	</a>
);

export default ExternalLink;
