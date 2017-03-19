const frontMatter = require('front-matter');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const objectAssign = require('object-assign');

const highlight = (str, lang) => {
	if ((lang !== null) && hljs.getLanguage(lang)) {
		try {
			return hljs.highlight(lang, str).value;
		} catch (_error) {
			console.error(_error);
		}
	}

	try {
		return hljs.highlightAuto(str).value;
	} catch (_error) {
		console.error(_error);
	}

	return '';
};

const md = markdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true,
	highlight,
})
	.use(require('markdown-it-sub'))
	.use(require('markdown-it-footnote'))
	.use(require('markdown-it-deflist'))
	.use(require('markdown-it-abbr'))
	.use(require('markdown-it-attrs'));

const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	const aHrefIndex = tokens[idx].attrIndex('href');
	const aHrefValue = tokens[idx].attrs[aHrefIndex][1];

	if (aHrefValue.indexOf('http') === 0) {
		const aTargetIndex = tokens[idx].attrIndex('target');
		if (aTargetIndex < 0) {
			tokens[idx].attrPush(['target', '_blank']);
		} else {
			tokens[idx].attrs[aTargetIndex][1] = '_blank';
		}

		const aRelIndex = tokens[idx].attrIndex('rel');
		if (aRelIndex < 0) {
			tokens[idx].attrPush(['rel', 'noopener']);
		} else {
			tokens[idx].attrs[aRelIndex][1] = 'noopener';
		}
	}

	return defaultRender(tokens, idx, options, env, self);
};

module.exports = function (content) {
	this.cacheable();
	const meta = frontMatter(content);
	const body = md.render(meta.body);
	const result = objectAssign({}, meta.attributes, {
		body,
	});
	this.value = result;
	return `module.exports = ${JSON.stringify(result)}`;
};
