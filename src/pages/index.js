import React, { Component } from 'react';
import Helmet from 'react-helmet';

import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';

export default class Index extends Component {
	render() {
		const { data } = this.props;
		const projects = data.allMarkdownRemark.edges.map(edge => edge.node);
		const { siteMetadata: { description } } = data.site;

		return (
			<div>
				<Helmet>
					<meta name="description" content={description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
				</Helmet>
				<Intro>
					<p>
						Hi! I’m a freelance web developer and designer. Have a look at some
						of the most popular project I’ve worked on below, and{' '}
						<a href="mailto:peter@simonsson.com">contact me</a> if you want to
						talk further.
					</p>
				</Intro>
				<ProjectList title="Projects" projects={projects} />
			</div>
		);
	}
}

/**
 * GraphQL
 */

export const pageQuery = graphql`
	query indexPageData {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(
			filter: { fields: { type: { eq: "project" } } }
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}
	}
`;
