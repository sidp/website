module.exports = {
	query: `
		{
			site {
				siteMetadata {
					title
					description
					siteUrl
				}
			}
		}
	`,
	feeds: [
		{
			serialize: ({ query: { site, allMarkdownRemark } }) => {
				return allMarkdownRemark.edges.map(edge => {
					return Object.assign({}, edge.node.frontmatter, {
						description: edge.node.excerpt,
						url: site.siteMetadata.siteUrl + edge.node.fields.slug,
						guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
						custom_elements: [{ 'content:encoded': edge.node.html }],
						date: edge.node.frontmatter.published,
					});
				});
			},
			query: `
				{
					allMarkdownRemark(
						filter: {
							fields: { type: { eq: "post" } },
							frontmatter: { draft: { ne: true } }
						},
						limit: 10,
						sort: { order: DESC, fields: [frontmatter___published] },
					) {
						edges {
							node {
								excerpt
								html
								fields {
									slug
								}
								frontmatter {
									title
									published
								}
							}
						}
					}
				}
			`,
			output: '/rss.xml',
		},
	],
};
