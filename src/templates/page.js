import React from 'react';
import PropTypes from 'prop-types';

import { isAbout, isProject } from '../utils/page-handling';
import MarkdownPage from '../components/markdown-page';
import About from '../components/about';
import Project from '../components/project';

const PageTemplate = ({ data }) => {
	const page = data.markdownRemark;

	return (
		<div>
			<h1>{page.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.html }} />
		</div>
	);

	/*
	const page = route.page.data;

	if (isAbout(page)) {
		return <About page={page} />;
	}

	if (isProject(page)) {
		return <Project page={page} />;
	}

	return <MarkdownPage page={page} />;*/
};

/*PageTemplate.propTypes = {
	route: PropTypes.object,
};*/

export default PageTemplate;

export const pageQuery = graphql`
	query PageBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug }}) {
			frontmatter {
				title
			}
			html
		}
	}
`;
