import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProjectItem from './project-item';
import {
	fadeIn,
	cubicBezierFadeIn,
	sansSerifFontFamily,
} from '../../styles/variables';

const ProjectList = ({ title = '', projects = [] }) => (
	<div>
		{title && <Title>{title}</Title>}
		<List>
			{projects.map(item => (
				<Item key={item.fields.slug} project={item} />
			))}
		</List>
	</div>
);

ProjectList.propTypes = {
	title: PropTypes.string,
	projects: PropTypes.arrayOf(PropTypes.object),
};

export default ProjectList;

/**
 * GraphQL
 */

export const projectListFragment = graphql`
	fragment Project_list on MarkdownRemark {
		...Project_item
	}
`;

/**
 * Styled components
 */

const Title = styled.h2`
	margin-top: 0;
	margin-bottom: 0.75rem;
	animation: ${fadeIn} 400ms 100ms ${cubicBezierFadeIn} both;
`;

let animationDelaySequence = '';
for (let i = 0; i < 12; i += 1) {
	animationDelaySequence += `
		&:nth-child(1n+${i}) { animation-delay: ${100 + 60 * i}ms; }
	`;
}

const Item = styled(ProjectItem)``;

const List = styled.div`
	font-family: ${sansSerifFontFamily};

	${Item} {
		animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
		${animationDelaySequence};

		@media screen and (max-width: 499px) {
			margin-bottom: 2rem;
		}
	}

	@media screen and (min-width: 500px) {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;

		${Item} {
			display: flex-item;
		}
	}

	@media screen and (min-width: 500px) and (max-width: 800px) {
		margin-left: -1.5%;
		margin-right: -1.5%;

		${Item} {
			flex-basis: 47%;
			margin-bottom: 2rem;
			margin-left: 1.5%;
			margin-right: 1.5%;
		}
	}

	@media screen and (min-width: 801px) {
		margin-left: -1.166665%;
		margin-right: -1.166665%;

		${Item} {
			flex-basis: 31%;
			margin-bottom: 2rem;
			margin-left: 1.166665%;
			margin-right: 1.166665%;
		}
	}
`;
