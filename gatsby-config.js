module.exports = {
	siteMetadata: {
		title: 'Peter Simonsson',
		description:
			'I’m a freelance web developer and designer in Stockholm, Sweden. This is a selection of the most popular projects I’ve worked on.',
		hostname: 'https://simonsson.com',
		navigation: [
			{
				label: 'Projects',
				path: '/',
			},
			{
				label: 'Blog',
				path: '/blog/',
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
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 690,
						},
					},
					'gatsby-remark-responsive-iframe',
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-json',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-1',
			},
		},
	],
};
