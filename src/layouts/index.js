import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Container } from '../styles/components';
import Header from '../components/header';
import Footer from '../components/footer';
import GlobalStyles from '../styles/global';
import '../styles/markdown-styles.css';

export default class Layout extends Component {
	render() {
		const { location, children } = this.props;

		return (
			<StaticQuery
				query={graphql`
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
									rel
								}
							}
						}
					}
				`}
				render={data => {
					const {
						site: {
							siteMetadata: { title, navigation, email, socialMediaLinks },
						},
					} = data;

					return (
						<>
							<GlobalStyles />
							<Helmet titleTemplate={`%s - ${title}`}>
								<title>{title}</title>
							</Helmet>
							<Header
								title={title}
								navigation={navigation}
								currentPath={location && location.pathname}
							/>
							<Container>{children}</Container>
							<Footer title={title} email={email} links={socialMediaLinks} />
						</>
					);
				}}
			/>
		);
	}
}
