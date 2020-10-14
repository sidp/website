const path = require('path');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return Promise.all([
		graphql(
			`
				{
					posts: allMarkdownRemark(
						filter: { frontmatter: { draft: { ne: true } } }
					) {
						edges {
							node {
								fields {
									slug
									type
								}
							}
						}
					}
				}
			`
		),
		graphql(
			`
				{
					posts: allMarkdownRemark(
						filter: {
							fields: { type: { eq: "post" } }
							frontmatter: { draft: { ne: true } }
						}
						sort: { order: DESC, fields: [frontmatter___published] }
					) {
						edges {
							node {
								fields {
									slug
									type
								}
							}
						}
					}
				}
			`
		),
	]).then(([result, resultForPosts]) => {
		const templates = {
			page: path.resolve('src/templates/page.js'),
			project: path.resolve('src/templates/project.js'),
			post: path.resolve('src/templates/post.js'),
			note: path.resolve('src/templates/post.js'),
			posts: path.resolve('src/templates/posts.js'),
			about: path.resolve('src/templates/about.js'),
		};

		/**
		 * Make all pages
		 */

		if (result.errors) {
			throw new Error(result.errors[0].message);
		}

		result.data.posts.edges.forEach((edge) => {
			const {
				fields: { type, slug },
			} = edge.node;
			const template = templates[type] || templates.page;

			createPage({
				path: slug,
				component: template,
				context: {
					slug,
				},
			});
		});

		/**
		 * Make the paginated posts page
		 */

		if (resultForPosts.errors) {
			throw new Error(resultForPosts.errors[0].message);
		}

		const groupPosts = (posts, perPage) =>
			posts.reduce((grouped, post, i) => {
				const group = Math.floor(i / perPage);
				grouped[group] = grouped[group] || [];
				grouped[group].push(post);
				return grouped;
			}, []);

		const makePagePath = (prefix, pageNo) =>
			`/${prefix}${pageNo > 1 ? `/${pageNo}` : ''}`;

		const posts = resultForPosts.data.posts.edges.map((edge) => edge.node);

		const template = templates.posts;
		const perPage = 3;
		const pathPrefix = 'posts';

		const grouped = groupPosts(posts, perPage);
		grouped.forEach((posts, i) => {
			const slugs = posts.map((post) => post.fields.slug);
			createPage({
				path: makePagePath(pathPrefix, i + 1),
				component: template,
				context: {
					posts,
					slugs,
					pageNo: i + 1,
					pageCount: grouped.length,
				},
			});
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	let slug;

	if (
		node.internal.type === 'MarkdownRemark' &&
		typeof node.slug === 'undefined'
	) {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);
		const postFormat = /([0-9]{4})\-([0-9]{2})\-([0-9]{2})\-(.+)/;

		const isPost =
			parsedFilePath.dir === 'posts' ||
			postFormat.exec(parsedFilePath.dir) !== null;

		const isNote =
			parsedFilePath.dir === 'notes' ||
			postFormat.exec(parsedFilePath.dir) !== null;

		if (isPost) {
			const name =
				parsedFilePath.dir === 'posts'
					? parsedFilePath.name
					: parsedFilePath.dir;

			const parts = postFormat.exec(name);
			slug = `/posts/${parts[4] || parsedFilePath.name}`;
		} else if (isNote) {
			const name =
				parsedFilePath.dir === 'notes'
					? parsedFilePath.name
					: parsedFilePath.dir;

			const parts = postFormat.exec(name);
			slug = `/notes/${parts[4] || parsedFilePath.name}`;
		} else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}`;
		} else if (parsedFilePath.dir === '') {
			slug = `/${parsedFilePath.name}`;
		} else {
			slug = `/${parsedFilePath.dir}`;
		}

		let nodeType = 'page';
		if (parsedFilePath.dir === 'projects') {
			nodeType = 'project';
		} else if (parsedFilePath.dir === 'notes') {
			nodeType = 'note';
		} else if (isPost) {
			nodeType = 'post';
		} else if (parsedFilePath.name === 'about') {
			nodeType = 'about';
		}

		createNodeField({
			node,
			name: 'type',
			value: nodeType,
		});

		// Add slug as a field on the node.
		createNodeField({ node, name: 'slug', value: slug });
	}
};
