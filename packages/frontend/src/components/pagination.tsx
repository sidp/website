import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const getUrlForPage = (pageNo) => `/${pageNo}`;

type PaginationProps = {
	pageNo: number;
	pageCount: number;
	urlForPageNo: (pageNo: number) => string;
};

const Pagination: React.FC<PaginationProps> = ({
	pageNo,
	pageCount,
	urlForPageNo = getUrlForPage,
}) => (
	<Block>
		{pageNo !== 1 ? (
			<Link href={urlForPageNo(pageNo - 1)}>
				<a>« Previous page</a>
			</Link>
		) : (
			<span />
		)}
		{pageNo !== pageCount ? (
			<Link href={urlForPageNo(pageNo + 1)}>
				<a>Next page »</a>
			</Link>
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
