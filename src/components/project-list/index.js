import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Columns, { Column } from '../columns';
import ProjectItem from './project-item';
import { fadeIn, cubicBezierFadeIn } from '../../styles/variables';

const ProjectList = ({ title = '', projects = [] }) => (
	<div>
		{title && <Title>{title}</Title>}

		<Columns>
			{projects.map(item => (
				<AnimatedColumn
					span={{ '<small': 12, '>small': 6, '>medium': 4 }}
					key={item.fields.slug}
				>
					<ProjectItem project={item} />
				</AnimatedColumn>
			))}
		</Columns>
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

const AnimatedColumn = styled(Column)`
	animation: ${fadeIn} 400ms ${cubicBezierFadeIn} both;
	${animationDelaySequence};
`;
