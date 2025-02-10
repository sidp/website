import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type ExternalLinkProps = DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
> & { href: string; rel?: string };

const ExternalLink: FC<ExternalLinkProps> = ({
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
