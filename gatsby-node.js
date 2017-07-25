const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;

	return new Promise((resolve, reject) => {
		const templates = {
			page: path.resolve('src/templates/page.js'),
			project: path.resolve('src/templates/project/index.js'),
			blogPost: path.resolve('src/templates/blog-post/index.js'),
			about: path.resolve('src/templates/about/index.js'),
		};

		graphql(
			`
				{
					allMarkdownRemark {
						edges {
							node {
								fields {
									slug,
									type
								}
							}
						}
					}
				}
			`
		).then(result => {
			if (result.errors) {
				reject(new Error(result.errors));
			}

			result.data.allMarkdownRemark.edges.forEach(edge => {
				const { fields: { type, slug } } = edge.node;
				const template = templates[type] || templates.page;

				createPage({
					path: slug,
					component: template,
					context: {
						slug,
					},
				});
			});

			resolve();
		});
	});
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators;
	let slug;

	if (
		node.internal.type === 'MarkdownRemark' &&
		typeof node.slug === 'undefined'
	) {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);

		if (parsedFilePath.dir === 'blog') {
			const parts = parsedFilePath.name.match(
				/([0-9]{4})\-([0-9]{2})\-([0-9]{2})\-([^\/]+)/
			);
			slug = `/blog/${parts[4] || parsedFilePath.name}/`;
		} else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === '') {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		let nodeType = 'page';
		if (parsedFilePath.dir === 'projects') {
			nodeType = 'project';
		} else if (parsedFilePath.dir === 'blog') {
			nodeType = 'blogPost';
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
