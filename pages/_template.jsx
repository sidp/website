import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import '../css/global';
import utils from '../css/utils.module';
import '../css/markdown-styles';

import Header from '../components/header';

import { rhythm } from '../utils/typography';

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
				<div style={{ backgroundColor: 'lightgray' }}>
					<div className={utils['container']}>
						<p>Footer</p>
					</div>
				</div>
			</div>
		)
	},
});
