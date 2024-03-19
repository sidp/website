/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			mono: ['IBM Plex Mono', 'monospace'],
		},
		colors: {
			black: 'black',
			white: '#eee',
			blue: '#1300ED',
		},
		extend: {},
	},
	plugins: [],
};
