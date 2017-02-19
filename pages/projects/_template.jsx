import React from 'react';

import { rhythm } from '../../utils/typography';
import { getProjects } from '../../utils/page-handling';
import ProjectList from '../../components/project-list';

const ProjectTemplate = (props) => {
	const projects = getProjects(props.route.pages);

	return (
		<div>
			{props.children}

			<h2 style={{ marginTop: rhythm(2) }}>More Projects</h2>
			<ProjectList projects={projects} exclude={props.location.pathname} />
		</div>
	);
};

export default ProjectTemplate;
