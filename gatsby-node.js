const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;

	return new Promise((resolve, reject) => {
		const pages = [];
		const pageTemplate = path.resolve('src/templates/page.js');
		resolve(
			graphql(
				`
					{
						allMarkdownRemark {
							edges {
								node {
									fields {
										slug
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
					createPage({
						component: pageTemplate,
						path: edge.node.fields.slug,
						context: {
							slug: edge.node.fields.slug,
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

		const nodeType = [];
		if (parsedFilePath.dir === 'projects') {
			nodeType.push('project');
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
