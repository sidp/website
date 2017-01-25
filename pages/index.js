import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Intro from '../components/intro';
import WorkList from '../components/work-list';

export default class Index extends React.Component {
	render () {
		return (
			<div>
				<Helmet
					title={config.siteTitle}
					meta={[
						{"name": "description", "content": "Sample"},
						{"name": "keywords", "content": "sample, something"},
					]}
				/>
				<h1>Peter Simonsson</h1>
				<p>Lorem ipsum dolor sit amet. <Link to={prefixLink('/markdown/')}>Markdown</Link>.</p>
				<h3>Supported CSS processors</h3>
				<ul>
					<li>
						<Link to={prefixLink('/postcss/')}>PostCSS</Link>
					</li>
					<li>
						<Link to={prefixLink('/css-modules/')}>CSS Modules</Link>
					</li>
					<li>
						<Link to={prefixLink('/sass/')}>Sass</Link>
					</li>
				</ul>
			</div>
		);
	}
}
