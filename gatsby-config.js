module.exports = {
	siteMetadata: {
		title: 'Peter Simonsson',
		description: 'I’m the Technical Director of Wenderfalck in Stockholm, Sweden. This is a selection of the most popular projects I’ve worked on.',
		navigation: [
			{
				label: 'Projects',
				path: '/',
			},
			{
				label: 'About',
				path: '/about/',
			},
		],
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-responsive-image',
						options: {
							maxWidth: 690,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-json',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-1',
			},
		},
	],
};
