import React, { Component, Fragment } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import MarkdownPage from '../components/markdown-page';
import PostDetails from '../components/post-details';
import { cubicBezierFadeIn } from '../styles/variables';
import NotesList from '../components/notes-list';

export default class BlogPost extends Component {
	render() {
		const {
			data: { markdownRemark: page, allNotes },
		} = this.props;
		const notes = allNotes.edges.map((node) => node.edge);

		return (
			<>
				<StyledMarkdownPage
					page={page}
					role="main"
					render={({ title, body }) => (
						<Fragment>
							{title}
							{body}
							<PostDetails>
								Published on{' '}
								<time
									dateTime={page.frontmatter.timestamp}
									className="dt-published"
								>
									{page.frontmatter.date}
								</time>
							</PostDetails>
						</Fragment>
					)}
				/>
				<NotesList notes={notes} />
			</>
		);
	}
}

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				excerpt
				date: published(formatString: "MMMM D, YYYY")
				timestamp: published
			}
			html
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

const StyledMarkdownPage = styled(MarkdownPage)`
	animation: fadeIn 500ms ${cubicBezierFadeIn} both;
`;
