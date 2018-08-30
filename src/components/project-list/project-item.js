import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ParallaxImage from '../parallax-image';
import { grayedColor, metaFontSize } from '../../styles/variables';
import thumbs from '../../images/thumbs';

const ProjectItem = ({
	project: {
		frontmatter: { title, client },
		fields: { slug },
	},
	className = '',
}) => {
	let images = [];
	let flattened = '';

	if (slug && thumbs[slug]) {
		images = thumbs[slug].images;
		flattened = thumbs[slug].flattened;
	}

	return (
		<div className={className}>
			<StyledLink to={slug}>
				<ParallaxImage images={images} flattened={flattened} />
				<Title>{title}</Title>
				<Meta>{client}</Meta>
			</StyledLink>
		</div>
	);
};

ProjectItem.propTypes = {
	project: PropTypes.shape({
		frontmatter: PropTypes.shape({
			title: PropTypes.string,
			client: PropTypes.string,
		}),
	}),
};

export default ProjectItem;

/**
 * GraphQL
 */

export const projectItemFragment = graphql`
	fragment Project_item on MarkdownRemark {
		frontmatter {
			title
			client
		}
		fields {
			slug
		}
	}
`;

/**
 * Styled components
 */

const StyledLink = styled(Link)`
	color: inherit;
	display: block;
`;

const Title = styled.h3`
	font-size: 1em;
	line-height: inherit;
	font-weight: inherit;
	margin-top: 0.55rem;
	margin-bottom: 0;
`;

const Meta = styled.p`
	color: ${grayedColor};
	font-size: ${metaFontSize};
	margin-top: 0;
	margin-bottom: 0;
`;
