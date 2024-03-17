import * as React from 'react';
import styled from 'styled-components';
import { metaFontSize } from '../../styles/variables';
import { Post } from '../../types';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../utils/sanity-client';

const builder = imageUrlBuilder(client);

type ProjectItemProps = {
	project: Post;
	className?: string;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
	project,
	className = '',
}) => {
	return (
		<Block className={`${className} h-entry`}>
			<StyledLink href={`/${project.slug.current}`} className="u-url">
				{project.image && (
					<Image
						src={builder.image(project.image).size(800, 600).url()}
						alt=""
						width="800"
						height="600"
						sizes="(max-width: 500px) 98vw, (max-width: 800px) 50vw, 33vw"
					/>
				)}
				<Title className="p-name">{project.title}</Title>
				{project.meta?.client && <Meta>{project.meta.client}</Meta>}
			</StyledLink>
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

const StyledLink = styled(Link)`
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
