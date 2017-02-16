import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import ProjectList from '../components/project-list';

export default class Index extends React.Component {
	render () {
		const projects = this.props.route.pages
			.filter(page => page.path.indexOf('/project') === 0)
			.sort((a, b) => a.data.weight - b.data.weight);

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
				<ProjectList projects={projects} />
			</div>
		)
	}
}
