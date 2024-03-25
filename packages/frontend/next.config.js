/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2400, 3200],
		remotePatterns: [
			{ hostname: 'cdn.sanity.io' },
			{ hostname: 'api.simonsson.com' },
		],
	},
	publicRuntimeConfig: {
		siteUrl: process.env.APP_BASENAME,
	},
	async rewrites() {
		return [
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
	async redirects() {
		return [
			{
				source: '/projects/:slug*',
				destination: '/:slug*',
				permanent: true,
			},
		];
	},
};
