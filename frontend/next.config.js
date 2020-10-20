module.exports = {
	async rewrites() {
		return [
			{
				source: '/webmention',
				destination: '/api/webmention',
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
