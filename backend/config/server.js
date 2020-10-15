module.exports = ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	admin: {
		auth: {
			secret: env('ADMIN_JWT_SECRET', 'e4bb4efd87a56ff5e67500d7b0f90737'),
		},
	},
});
