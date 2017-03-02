import React from 'react';

import { rhythm } from '../../utils/typography';
import { getProjects } from '../../utils/page-handling';
import ProjectList from '../../components/project-list';

const ProjectTemplate = ({ route, location, children }) => {
	const projects = getProjects(route.pages);

	return (
		<div>
			{children}

			<h2 style={{ marginTop: rhythm(2) }}>More Projects</h2>
			<ProjectList projects={projects} exclude={location.pathname} />
		</div>
	);
};

export default ProjectTemplate;
