/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2400, 3200],
		domains: ['localhost', 'api.simonsson.com', 'cdn.sanity.io'],
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
			{
				source: '/feed/:format',
				destination: '/api/feed/:format',
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
