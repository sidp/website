import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import absoluteUrl from '../utils/absolute-uri';
import Intro from '../components/intro';
import ProjectList from '../components/project-list';
import PostsList from '../components/posts-list';
import { InnerContainer, TextWrapper } from '../styles/components';

export default class Index extends Component {
	render() {
		const { data } = this.props;
		const projects = data.allProjects.edges.map(edge => edge.node);
		const posts = data.allPosts.edges.map(edge => edge.node);
		const { siteMetadata } = data.site;

		return (
			<>
				<Helmet>
					<meta name="description" content={siteMetadata.description} />
					<meta
						name="og:image"
						content={absoluteUrl(require('../static/images/og-image.png'))}
					/>
				</Helmet>
				<Intro />
				<ProjectList title="Projects" projects={projects} />
				<StyledInnerContainer>
					<StyledTextWrapper>
						<PostsList posts={posts} />
					</StyledTextWrapper>
				</StyledInnerContainer>
			</>
		);
	}
}

const StyledInnerContainer = styled(InnerContainer)`
	padding-top: 1px;
	margin-bottom: 0;
`;

const StyledTextWrapper = styled(TextWrapper)`
	margin-bottom: 2rem;
`;

export const pageQuery = graphql`
	query indexPageData {
		site {
			siteMetadata {
				title
				description
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

		allPosts: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "post" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					...PostList_item
				}
			}
		}

		allUpdates: allMarkdownRemark(
			filter: {
				fields: { type: { eq: "update" } }
				frontmatter: { draft: { ne: true } }
			}
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					id
					frontmatter {
						title
						date: published(formatString: "MMMM d, YYYY")
						timestamp: published
					}
					fields {
						slug
					}
					html
				}
			}
		}
	}
`;
