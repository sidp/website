import React, { FC, ReactNode } from 'react';
import ExternalLink from './external-link';

type MetaProps = {
	agency?: string;
	client?: string;
	year?: string;
	link?: string;
};

const Meta: React.FC<MetaProps> = ({ agency, client, year, link }) => {
	const items: ReactNode[] = [];

	if (year) {
		items.push(<MetaItem key="year" value={year} />);
	}

	if (agency) {
		items.push(<MetaItem key="agency" label="Agency" value={agency} />);
	}

	if (client) {
		items.push(<MetaItem key="client" label="Client" value={client} />);
	}

	if (link) {
		const value = link.replace(/^https?:\/\/(www\.)?([^/]+).*$/, '$2');
		items.push(<MetaItem key="link" label="Link" value={value} link={link} />);
	}

	return <div className="flex flex-wrap gap-5 text-light-gray">{items}</div>;
};

export default Meta;

/**
 * Meta item
 * Component for each field
 */

const MetaItem: FC<{ label?: string; value: string; link?: string }> = ({
	label,
	value,
	link = '',
}) => {
	let valueElement: React.ReactNode;

	if (link) {
		valueElement = <ExternalLink href={link}>{value}</ExternalLink>;
	} else {
		valueElement = value;
	}

	return (
		<span className="whitespace-nowrap">
			{label && `${label}: `} {valueElement}
		</span>
	);
};
