import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';

import '../styles/global';
import '../styles/markdown-styles.css';
import { Container } from '../styles/components';

const Layout = ({ location, data, children }) => {
	const {
		site: { siteMetadata: { title, navigation, email, socialMediaLinks } },
	} = data;
	return (
		<div>
			<Helmet defaultTitle={title} titleTemplate={`%s - ${title}`} />
			<Header
				title={title}
				navigation={navigation}
				currentPath={location && location.pathname}
			/>
			<Container>{children()}</Container>
			<Footer title={title} email={email} links={socialMediaLinks} />
		</div>
	);
};

export default Layout;

export const query = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
				email
				navigation {
					label
					path
				}
				socialMediaLinks {
					label
					title
					url
				}
			}
		}
	}
`;
