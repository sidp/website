import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../external-link';

import styles from './project.module.css';

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
		const value = link.replace(/^https?\:\/\/(www\.)?([^\/]+).*$/, '$2');
		items.push(<MetaItem key="link" label="Link" value={value} link={link} />);
	}

	return <div className={styles['meta']}>{items}</div>;
};

Meta.propTypes = {
	agency: PropTypes.string,
	client: PropTypes.string,
	year: PropTypes.string,
	link: PropTypes.string,
};

export default Meta;

const MetaItem = ({ label, value, link = '' }) => {
	let valueElement;

	if (link) {
		valueElement = (
			<ExternalLink to={link} className={styles['meta-value']}>
				{value}
			</ExternalLink>
		);
	} else {
		valueElement = (
			<span className={styles['meta-value']}>
				{value}
			</span>
		);
	}

	return (
		<span className={styles['meta-item']}>
			<span className={styles['meta-label']}>{label}:</span>
			{' '}
			{valueElement}
		</span>
	);
};

MetaItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	link: PropTypes.string,
};
