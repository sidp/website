/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			sans: ['iA Writer Duo', 'monospace'],
			mono: ['iA Writer Mono', 'monospace'],
		},
		colors: {
			black: 'black',
			gray: '#222',
			'light-gray': '#999',
			white: '#eee',
			blue: '#1300ED',
			hover: '#100B4C',
		},
		extend: {},
	},
	plugins: [],
};
