import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../utils/typography';
import Header from '../components/header';
import Footer from '../components/footer';

import '../css/global.css';
import '../css/markdown-styles.css';
import utils from '../css/utils.module.css';

module.exports = React.createClass({
	propTypes () {
		return {
			children: React.PropTypes.any,
		}
	},
	render () {
		return (
			<div>
				<Header slim={this.props.location.pathname !== '/'} />
				<div className={utils['container']}>
					{this.props.children}
				</div>
				<Footer />
			</div>
		)
	},
});
