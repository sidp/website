import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import { rhythm } from '../utils/typography';
import Header from '../components/header';
import Footer from '../components/footer';

import '../css/global.css';
import '../css/markdown-styles.css';
import utils from '../css/utils.module.css';

export default class Layout extends Component {
	render() {
		return (
			<div>
				<Helmet
					defaultTitle={siteMetadata.title}
					titleTemplate={`%s - ${siteMetadata.title}`}
				/>
				<Header currentPath={this.props.location.pathname} />
				<div className={utils['container']}>
					{this.props.children()}
				</div>
				<Footer />
			</div>
		);
	}
}
