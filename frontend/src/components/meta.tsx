import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from './external-link';
import {
	metaFontFamily,
	metaFontSize,
	linkBoxShadow,
} from '../styles/variables';

type MetaProps = {
	agency?: string;
	client?: string;
	year?: string;
	link?: string;
};

const Meta: React.FC<MetaProps> = ({ agency, client, year, link }) => {
	const items = [];

	if (agency) {
		items.push(<MetaItem key="agency" label="Agency" value={agency} />);
	}

	if (client) {
		items.push(<MetaItem key="client" label="Client" value={client} />);
	}

	if (year) {
		items.push(<MetaItem key="year" label="Year" value={year} />);
	}

	if (link) {
		const value = link.replace(/^https?:\/\/(www\.)?([^/]+).*$/, '$2');
		items.push(<MetaItem key="link" label="Link" value={value} link={link} />);
	}

	return <Block>{items}</Block>;
};

export default Meta;

/**
 * Meta item
 * Component for each field
 */

const MetaItem = ({ label, value, link = '' }) => {
	let valueElement: React.ReactNode;

	if (link) {
		valueElement = <StyledExternalLink href={link}>{value}</StyledExternalLink>;
	} else {
		valueElement = <Value>{value}</Value>;
	}

	return (
		<Item>
			<Label>{label}:</Label> {valueElement}
		</Item>
	);
};

MetaItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	link: PropTypes.string,
};

/**
 * Styled components
 */

const Block = styled.div`
	color: var(--grayed-color);
	margin: 0.3em 0 1em;
	font-family: ${metaFontFamily};
	font-size: ${metaFontSize};
`;

const Item = styled.span`
	display: inline-block;
	white-space: nowrap;

	&:not(:last-of-type) {
		margin-right: 1em;
	}
`;

const Label = styled.span``;

const Value = styled.span`
	font-weight: 600;
`;

const StyledExternalLink = styled(ExternalLink)`
	font-weight: 600;
	color: var(--grayed-color);
	box-shadow: ${linkBoxShadow};

	&:hover {
		color: var(--grayed-color--hover);
	}

	&:active {
		color: var(--grayed-color--active);
	}
`;
