import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import { pageProps } from '../prop-types';
import pageTitle from '../../utils/page-title';

import '../../css/markdown-styles.css';
import utils from '../../css/utils.module.css';

const MarkdownPage = ({ page }) => (
	<article role="main" className={`markdown ${utils['text-wrapper']}`}>
		<Helmet title={pageTitle(page)} />
		<h1>{page.title}</h1>
		<div dangerouslySetInnerHTML={{ __html: page.body }} />
	</article>
);

MarkdownPage.propTypes = {
	page: pageProps,
};

export default MarkdownPage;
