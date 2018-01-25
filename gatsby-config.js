module.exports = {
	pathPrefix: '/',
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
							maxWidth: 684,
							linkImagesToOriginal: false,
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
		'gatsby-plugin-react-next',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-sharp',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Peter Simonsson',
				short_name: 'Peter S.',
				start_url: '/',
				background_color: '#F0E8F0',
				theme_color: '#0099FF',
				display: 'minimal-ui',
				icons: [
					{
						src: '/images/chrome-192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/images/chrome-512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: require('./gatsby-plugin-feed-options'),
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-1',
			},
		},
	],
};
