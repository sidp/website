import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Helmet from 'react-helmet';

import { config } from '../config';
import pageTitle from '../utils/page-title';
import absoluteUri from '../utils/absolute-uri';
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
						content: config.description,
					},
					{
						property: 'og:image',
						content: absoluteUri(require('file-loader!../images/og-image.png')),
					},
				]}
			/>

			<Intro />
			<ProjectList title="Projects" projects={projects} />
		</div>
	);
};

export default Index;
