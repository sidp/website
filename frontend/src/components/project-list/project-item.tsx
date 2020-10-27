import * as React from 'react';
import styled from 'styled-components';
import { metaFontSize } from '../../styles/variables';
import thumbs from '../../thumbs';
import { Project } from '../../types';
import Link from 'next/link';
import Image from 'next/image';

type ProjectItemProps = {
	project: Project;
	className?: string;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
	project,
	className = '',
}) => {
	let image = '';

	if (project.slug && thumbs[project.slug]) {
		image = thumbs[project.slug].flattened;
	}

	return (
		<Block className={`${className} h-entry`}>
			<Link href="/projects/[slug]" as={`/projects/${project.slug}`} passHref>
				<StyledLink className="u-url">
					<Image
						src={image}
						width="800"
						height="600"
						sizes="(max-width: 500px) 98vw, (max-width:800px) 50vw, 33vw"
					/>
					<Title className="p-name">{project.title}</Title>
					<Meta>{project.client}</Meta>
				</StyledLink>
			</Link>
		</Block>
	);
};

export default ProjectItem;

/**
 * Styled components
 */

const Block = styled.span`
	display: block;
`;

const StyledLink = styled.a`
	color: inherit;
	display: block;

	&:hover,
	&:active {
		color: inherit;
	}
`;

const Title = styled.h3`
	font-size: 1em;
	line-height: inherit;
	font-weight: inherit;
	margin-top: 0.6rem;
	margin-bottom: 0.1rem;
`;

const Meta = styled.p`
	color: var(--grayed-color);
	font-size: ${metaFontSize};
	font-family: var(--sans-serif-font-family);
	margin-top: 0;
	margin-bottom: 0;
`;
