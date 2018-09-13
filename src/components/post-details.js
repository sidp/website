import React from 'react';
import styled from 'styled-components';
import {
	grayedColor,
	metaFontFamily,
	metaFontSize,
	accentColor,
} from '../styles/variables';

const PostDetails = ({ children }) => <Block>{children}</Block>;

export default PostDetails;

const Block = styled.div`
	color: ${grayedColor};
	margin: 1rem 0 1rem;
	padding-top: 0.5rem;
	font-family: ${metaFontFamily};
	font-size: ${metaFontSize};
	border-top: 1px solid ${accentColor};
`;
