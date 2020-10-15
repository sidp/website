import marked from 'marked';
const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = function (href, title, text) {
	const html = linkRenderer.call(renderer, href, title, text);
	return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
};

export default function markdown(src: string) {
	return marked(src, { renderer });
}
