import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Columns, { Column } from './columns';
import { fadeIn, cubicBezierFadeIn, metaFontSize } from '../styles/variables';
import { Link } from 'gatsby';

const NotesList = ({ title = '', notes = [] }) => (
	<Block>
		{title && <Title>{title}</Title>}

		<Columns className="h-feed">
			{notes.map((item) => {
				const date = (
					<time dateTime={item.frontmatter.timestamp} className="dt-published">
						{item.frontmatter.date}
					</time>
				);

				const renderBody = () => {
					const body = (
						<>
							<NoteTitle className="p-name">{item.frontmatter.title}</NoteTitle>
							<Body dangerouslySetInnerHTML={{ __html: item.html }} />
						</>
					);

					if (item.frontmatter.link) {
						return (
							<StyledLink
								to={item.frontmatter.link}
								target="_blank"
								rel="noopener"
							>
								{body}
							</StyledLink>
						);
					}

					return body;
				};

				return (
					<AnimatedColumn
						span={{ '<small': 12, '>small': 6, '>medium': 4 }}
						key={item.fields.slug}
					>
						<div className="h-entry">
							{renderBody()}
							<Meta>
								<StyledLink to={item.fields.slug} className="u-url">
									{date}
								</StyledLink>
							</Meta>
						</div>
					</AnimatedColumn>
				);
			})}
		</Columns>
	</Block>
);

NotesList.propTypes = {
	title: PropTypes.string,
	projects: PropTypes.arrayOf(PropTypes.object),
};

export default NotesList;

/**
 * GraphQL
 */

export const projectItemFragment = graphql`
	fragment Note_item on MarkdownRemark {
		id
		frontmatter {
			title
			date: published(formatString: "MMMM D, YYYY")
			timestamp: published
			link
		}
		fields {
			slug
		}
		html
	}
`;

/**
 * Styled components
 */

const Block = styled.div`
	&:not(:first-child) {
		margin-top: 3rem;
	}

	&:not(:last-child) {
		margin-bottom: 5rem;
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

const StyledLink = styled(Link)`
	color: inherit;
	display: inline-block;
	box-shadow: none;

	&:hover,
	&:active {
		color: inherit;
	}
`;

const NoteTitle = styled.h3`
	font-size: 1.1rem;
	font-weight: 600;
	margin-top: 0.25rem;
	margin-bottom: 0.45rem;
`;

const Meta = styled.p`
	color: var(--grayed-color);
	font-size: ${metaFontSize};
	font-family: var(--sans-serif-font-family);
	margin-top: 0;
	margin-bottom: 0;
`;

const Body = styled.div`
	margin-top: 0.15rem;
	margin-bottom: 0.35rem;
	font-size: 0.85rem;

	p:last-child {
		margin-bottom: 0;
	}
`;
