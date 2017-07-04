import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';

import { config } from '../config';
import { rhythm } from '../utils/typography';
import Header from '../components/header';
import Footer from '../components/footer';

import '../css/global.css';
import '../css/markdown-styles.css';
import utils from '../css/utils.module.css';

const Template = ({ children, route, location }) =>
	<div>
		<Helmet
			meta={[
				{
					property: 'og:site_name',
					content: config.siteTitle,
				},
			]}
		/>
		<Header currentPath={location.pathname} />
		<div className={utils['container']}>
			{children}
		</div>
		<Footer />
	</div>;

Template.propTypes = {
	children: PropTypes.any,
};

export default Template;
