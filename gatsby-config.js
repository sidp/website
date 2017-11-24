module.exports = {
	pathPrefix: '/',
	siteMetadata: {
		title: 'Peter Simonsson',
		description:
			'I’m a freelance web developer and designer in Stockholm, Sweden. This is a selection of the most popular projects I’ve worked on.',
		hostname: 'https://simonsson.com',
		email: 'peter@simonsson.com',
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
		socialMediaLinks: [
			{
				label: 'Twitter',
				title: '@sidp on Twitter',
				url: 'https://twitter.com/sidp',
			},
			{
				label: 'GitHub',
				title: '@sidp on GitHub',
				url: 'https://github.com/sidp',
			},
			{
				label: 'LinkedIn',
				title: 'Peter Simonsson on LinkedIn',
				url: 'https://www.linkedin.com/in/sidp86',
			},
			{
				label: 'Instagram',
				title: '@sidp on Instagram',
				url: 'https://www.instagram.com/sidp/',
			},
			{
				label: 'Last.fm',
				title: 'sidp on Last.fm',
				url: 'http://www.last.fm/user/sidp',
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
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-60527-1',
			},
		},
	],
};
