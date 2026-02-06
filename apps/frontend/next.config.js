/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		qualities: [75, 90],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [320, 420, 768, 1024, 1200, 1440, 1920, 2400, 3200],
		remotePatterns: [
			{ hostname: 'cdn.sanity.io' },
			{ hostname: 'api.simonsson.com' },
		],
	},
	async rewrites() {
		return [
			{
				source: '/feed/:format',
				destination: '/api/feed/:format',
			},
			{
				source: '/js/script.js',
				destination: 'https://plausible.io/js/script.js',
			},
			{
				source: '/api/event',
				destination: 'https://plausible.io/api/event',
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/projects/:slug',
				destination: '/:slug',
				permanent: true,
			},
			{
				source: '/sailor-ts66',
				destination: '/shortwave-receiver',
				permanent: true,
			},
		];
	},
};
