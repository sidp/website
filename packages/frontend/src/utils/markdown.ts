import marked from 'marked';
import Prism from 'prismjs';

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
const codeRenderer = renderer.code;

renderer.link = (href, title, text) => {
	const html = linkRenderer.call(renderer, href, title, text);
	return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
};

renderer.image = (href, title, text) => {
	return `<img src="${
		process.env.NEXT_PUBLIC_UPLOAD_PREFIX + href
	}" alt="${text}" ${title ? ` title="${title}"` : ''}" />`;
};

renderer.code = (code, language, isEscaped) => {
	let output: string;

	if (language in Prism.languages) {
		output = `<pre><code class="language-${language}">${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`;
	} else {
		output = codeRenderer.call(renderer, code, language, isEscaped);
	}

	return output;
};

export default function markdown(src: string) {
	marked.use({ renderer });
	return marked(src, { headerIds: true });
}
