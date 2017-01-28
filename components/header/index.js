import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../../utils/typography';

import styles from './header.module.css';

export default class Header extends Component {

	render() {
		return (
			<header>
				<Container
					style={{
						maxWidth: 960,
						paddingTop: 0,
						padding: `${rhythm(1)} ${rhythm(3/4)}`,
					}}
				>
					<h1 className={styles['title']}>
						<Link to={prefixLink('/')}>Peter Simonsson</Link>
					</h1>
					<p>
						<a href="http://twitter.com/sidp">Twitter</a>
						<a href="http://dribbble.com/sidp">Dribbble</a>
						<a href="http://last.fm/user/sidp">Last.fm</a>
						<a href="http://linkedin.com/profile/view?id=9864846">LinkedIn</a>
					</p>
				</Container>
			</header>
		);
	}
}
