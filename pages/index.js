import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import WorkList from '../components/work-list';

export default class Index extends React.Component {
	render () {
		const work = this.props.route.pages
			.filter(page => page.path.indexOf('/work') === 0);

		return (
			<div>
				<Helmet
					title={config.siteTitle}
					meta={[
						{"name": "description", "content": "Sample"},
						{"name": "keywords", "content": "sample, something"},
					]}
				/>
				<h2>Projects</h2>
				<WorkList work={work} />
			</div>
		)
	}
}
