import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';

import '../styles/global';
import '../styles/markdown-styles.css';
import { Container } from '../styles/components';

export default class Layout extends Component {
	render() {
		const {
			site: { siteMetadata: { title, navigation, email, socialMediaLinks } },
		} = this.props.data;
		return (
			<div>
				<Helmet defaultTitle={title} titleTemplate={`%s - ${title}`} />
				<Header
					title={title}
					navigation={navigation}
					currentPath={this.props.location && this.props.location.pathname}
				/>
				<Container>{this.props.children()}</Container>
				<Footer title={title} email={email} links={socialMediaLinks} />
			</div>
		);
	}
}

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
