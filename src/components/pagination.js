import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const getUrlForPage = pageNo => `/${pageNo}`;

const Pagination = ({ pageNo, pageCount, urlForPageNo = getUrlForPage }) => (
	<Block>
		{pageNo !== 1 ? (
			<Link to={urlForPageNo(pageNo - 1)}>« Previous page</Link>
		) : (
			<span />
		)}
		{pageNo !== pageCount ? (
			<Link to={urlForPageNo(pageNo + 1)}>Next page »</Link>
		) : (
			<span />
		)}
	</Block>
);

export default Pagination;

const Block = styled.p`
	border-top: 1px solid var(--accent-color);
	padding-top: 1em;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
