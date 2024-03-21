/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			mono: ['IBM Plex Mono', 'monospace'],
		},
		colors: {
			black: 'black',
			gray: '#222',
			white: '#eee',
			blue: '#1300ED',
			hover: '#100B4C',
		},
		extend: {},
	},
	plugins: [],
};
