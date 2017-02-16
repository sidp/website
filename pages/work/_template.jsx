import React from 'react'
import { rhythm } from '../../utils/typography';
import ProjectList from '../../components/project-list';

const ProjectTemplate = (props) => {
	const projects = props.route.pages
		.filter(page => page.path.indexOf('/project') === 0)
		.sort((a, b) => a.data.weight - b.data.weight);

	return (
		<div>
			{props.children}

			<h2 style={{ marginTop: rhythm(2) }}>More Projects</h2>
			<ProjectList projects={projects} />
		</div>
	);
};

export default ProjectTemplate;
