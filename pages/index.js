import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import { getProjects } from '../utils/page-handling';
import ProjectList from '../components/project-list';

export default class Index extends React.Component {
	render () {
		const projects = getProjects(this.props.route.pages);

		return (
			<div>
				<Helmet
					title={pageTitle()}
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
