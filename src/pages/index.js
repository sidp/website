import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';

import pageTitle from '../utils/page-title';
import { getProjects } from '../utils/page-handling';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

const Index = ({ route }) => {
	const projects = getProjects(route.pages);

	return (
		<div>
			<Helmet
				title={pageTitle()}
				meta={[
					{
						name: 'description',
						content: 'I’m the Technical Director of Wenderfalck in Stockholm, Sweden. This is a selection of the most popular projects I’ve worked on.',
					},
				]}
			/>

			<Intro />
			<ProjectList title="Projects" projects={projects} />
		</div>
	);
};

export default Index;
