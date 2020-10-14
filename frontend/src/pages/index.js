import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import NotesList from '../components/notes-list';

export default class Index extends Component {
	render() {
		const { allProjects, allNotes, site } = this.props.data;
		const projects = allProjects.edges.map((edge) => edge.node);
		const notes = allNotes.edges.map((edge) => edge.node);
		const { description, siteUrl } = site.siteMetadata;

		return (
			<>
				<Helmet>
					<meta name="description" content={description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
					<link rel="canonical" href={`${siteUrl}`} />
				</Helmet>
				<Intro>
					<p>
						Welcome to my personal website. During the day I’m a web developer
						and designer at{' '}
						<a href="https://tulastudio.se" target="_blank" rel="noopener">
							Tula Studio
						</a>{' '}
						in Malmö, Sweden. This site contains bits and bobs of what I publish
						online.
					</p>
				</Intro>
				<NotesList notes={notes} />
				<ProjectList title="Projects" projects={projects} />
			</>
		);
	}
}

export const pageQuery = graphql`
	query indexPageData {
		site {
			siteMetadata {
				title
				description
				siteUrl
			}
		}

		allProjects: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "project" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}

		allNotes: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "note" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					...Note_item
				}
			}
		}
	}
`;
