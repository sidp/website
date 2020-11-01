module.exports = {
	images: {
		deviceSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2400],
		domains: ['localhost', 'api.simonsson.com'],
	},
	publicRuntimeConfig: {
		siteUrl: process.env.APP_BASENAME,
	},
	async rewrites() {
		return [
			{
				source: '/webmention',
				destination: '/api/webmention',
			},
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
		];
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Link',
						value: `<${process.env.APP_BASENAME}/webmention>; rel="webmention"`,
					},
				],
			},
		];
	},
};
