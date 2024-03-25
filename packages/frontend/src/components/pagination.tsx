import Link from 'next/link';
import React from 'react';

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
	<p>
		{pageNo !== 1 ? (
			<Link href={urlForPageNo(pageNo - 1)}>« Previous page</Link>
		) : (
			<span />
		)}
		{pageNo !== pageCount ? (
			<Link href={urlForPageNo(pageNo + 1)}>Next page »</Link>
		) : (
			<span />
		)}
	</p>
);

export default Pagination;
