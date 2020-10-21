import marked from 'marked';
const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
const imageRenderer = renderer.image;

renderer.link = function (href, title, text) {
	const html = linkRenderer.call(renderer, href, title, text);
	return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
};

renderer.image = function(href, title, text) {
	const html = imageRenderer.call(renderer, href, title, text);
	console.log(href, title, text);

	return `<img src="${process.env.NEXT_PUBLIC_UPLOAD_PREFIX + href}" alt="${text}" ${title ? ` title="${title}"` : ''}" />`;
}

export default function markdown(src: string) {
	return marked(src, { renderer, headerIds: true });
}
