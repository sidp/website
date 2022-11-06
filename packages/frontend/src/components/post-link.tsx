import * as React from 'react';
import styled from 'styled-components';
import { getDomain } from '../utils/url';

type PostLinkProps = {
	url: string;
};

const PostLink: React.FC<PostLinkProps> = ({ url }) => {
	return (
		<Block>
			<a href={url} target="_blank" rel="noopener">
				Visit
			</a>
			<small>{getDomain(url)}</small>
		</Block>
	);
};

export default PostLink;

const Block = styled.div`
	margin-top: 1.2rem;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 0.85rem;

	a {
		display: inline-block;
		padding: 0.45rem 0.8rem 0.5rem;
		color: var(--link-color);
		border: 0.05rem solid var(--link-color);
		border-radius: 0.15rem;
		font-weight: 600;
		margin-right: 0.8rem;
	}
	small {
		color: var(--grayed-color);
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 400;
	}
`;
