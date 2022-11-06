import * as React from 'react';
import styled from 'styled-components';
import Columns, { Column } from '../columns';
import ProjectItem from './project-item';
import { fadeIn, cubicBezierFadeIn } from '../../styles/variables';
import { Project } from '../../types';

type ProjectListProps = {
	title?: string;
	projects: Project[];
};

const ProjectList: React.FC<ProjectListProps> = ({ title = '', projects }) => (
	<Block>
		{title && <Title>{title}</Title>}

		<Columns className="h-feed">
			{projects.map((project) => (
				<AnimatedColumn
					span={{ '<small': 12, '>small': 6, '>medium': 4 }}
					key={project.slug}
				>
					<ProjectItem project={project} />
				</AnimatedColumn>
			))}
		</Columns>
	</Block>
);

export default ProjectList;

/**
 * Styled components
 */

const Block = styled.div`
	&:not(:first-child) {
		margin-top: 3rem;
	}

	&:not(:last-child) {
		margin-bottom: 3rem;
	}
`;

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
