import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { TextWrapper } from '../styles/components';
import PostsList from '../components/posts-list';
import Pagination from '../components/pagination';

const getUrlForPage = pageNo => `/posts${pageNo > 1 ? `/${pageNo}` : ''}`;

export default class BlogPostList extends Component {
	render() {
		const { pageNo, pageCount } = this.props.pageContext;
		const posts = this.props.data.posts.edges.map(edge => edge.node);

		return (
			<>
				<Helmet>
					<title>Posts</title>
				</Helmet>
				<TextWrapper>
					<PostsList posts={posts} />
					<Pagination
						pageNo={pageNo}
						pageCount={pageCount}
						urlForPageNo={getUrlForPage}
					/>
				</TextWrapper>
			</>
		);
	}
}

export const pageQuery = graphql`
	query BlogPageData($slugs: [String]!) {
		posts: allMarkdownRemark(
			filter: {
				fields: { slug: { in: $slugs } }
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
	}
`;
