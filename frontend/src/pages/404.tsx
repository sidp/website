import * as React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

const ErrorPage404: NextPage = () => {
	return (
		<>
			<Head>
				<title>Page not found</title>
				<meta name="robots" content="noindex" />
			</Head>

			<h1>Page Not Found</h1>
			<p>The requested page could not be found.</p>
		</>
	);
};

export default ErrorPage404;
