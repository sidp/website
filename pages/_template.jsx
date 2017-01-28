import React from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import '../css/global';
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
				<Header />
				<Container
					style={{
						maxWidth: 960,
						padding: `${rhythm(1)} ${rhythm(3/4)}`,
						paddingTop: 0,
					}}
				>
					{this.props.children}
				</Container>
				<div style={{ backgroundColor: 'lightgray' }}>
					<Container
						style={{
							maxWidth: 960,
							padding: `${rhythm(1)} ${rhythm(3/4)}`,
							paddingTop: 0,
						}}
					>
						<p>Footer</p>
					</Container>
				</div>
			</div>
		)
	},
});
