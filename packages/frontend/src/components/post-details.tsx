import React from 'react';
import styled from 'styled-components';
import { metaFontFamily, metaFontSize } from '../styles/variables';

type PostDetailsProps = {
	children: React.ReactNode;
};

const PostDetails: React.FC<PostDetailsProps> = ({ children }) => (
	<Block>{children}</Block>
);

export default PostDetails;

const Block = styled.div`
	color: var(--grayed-color);
	margin: 1rem 0 1rem;
	padding-top: 0.5rem;
	font-family: ${metaFontFamily};
	font-size: ${metaFontSize};
	border-top: 1px solid var(--accent-color);
`;
