const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;

	return new Promise((resolve, reject) => {
		const pages = [];
		const templates = {
			page: path.resolve('src/templates/page.js'),
			project: path.resolve('src/templates/project.js'),
			about: path.resolve('src/templates/about.js'),
		};

		resolve(
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
									frontmatter {
										path
									}
								}
							}
						}
					}
				`
			).then(result => {
				if (result.errors) {
					reject(result.errors);
				}

				result.data.allMarkdownRemark.edges.forEach(edge => {
					const { fields: { type, slug }, frontmatter: { path } } = edge.node;
					const template = templates[type] || templates.page;

					createPage({
						path: slug || path,
						component: template,
						context: {
							slug: slug || path,
						},
					});
				});

				return;
			})
		);
	});
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators;
	let slug;

	if (node.internal.type === 'MarkdownRemark') {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);
		if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === ``) {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		let nodeType = 'page';
		if (parsedFilePath.dir === 'projects') {
			nodeType = 'project';
		} else if (parsedFilePath.name === 'about') {
			nodeType = 'about';
		}

		createNodeField({
			node,
			fieldName: 'type',
			fieldValue: nodeType,
		});

		// Add slug as a field on the node.
		createNodeField({ node, fieldName: 'slug', fieldValue: slug });
	}
};
