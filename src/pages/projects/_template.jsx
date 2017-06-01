import React from 'react';

import { rhythm } from '../../utils/typography';
import { getProjects } from '../../utils/page-handling';
import ProjectList from '../../components/project-list';

const ProjectTemplate = ({ route, location, children }) => {
	const projects = getProjects(route.pages);

	return (
		<div>
			{children}

			<ProjectList
				title="More Projects"
				projects={projects}
				exclude={location.pathname}
			/>
		</div>
	);
};

export default ProjectTemplate;
