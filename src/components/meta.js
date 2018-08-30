import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from './external-link';
import {
	grayedColor,
	metaFontFamily,
	metaFontSize,
	linkBoxShadow,
	grayedColorHover,
	grayedColorActive,
} from '../styles/variables';

const Meta = ({ agency = '', client = '', year = '', link = '' }) => {
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

Meta.propTypes = {
	agency: PropTypes.string,
	client: PropTypes.string,
	year: PropTypes.string,
	link: PropTypes.string,
};

export default Meta;

/**
 * Meta item
 * Component for each field
 */

const MetaItem = ({ label, value, link = '' }) => {
	let valueElement;

	if (link) {
		valueElement = <StyledExternalLink to={link}>{value}</StyledExternalLink>;
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
	color: ${grayedColor};
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
	color: ${grayedColor};
	box-shadow: ${linkBoxShadow};

	&:hover {
		color: ${grayedColorHover};
	}

	&:active {
		color: ${grayedColorActive};
	}
`;
