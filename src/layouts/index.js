import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import Header from '../components/header';
import Footer from '../components/footer';

import '../styles/global';
import '../styles/markdown-styles.css';
import { Container } from '../styles/components';

export default class Layout extends Component {
	render() {
		const { location, children } = this.props;
		return (
			<>
				<Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
					<title>{siteMetadata.title}</title>
				</Helmet>
				<Header currentPath={location && location.pathname} />
				<Container>{children}</Container>
				<Footer />
			</>
		);
	}
}
