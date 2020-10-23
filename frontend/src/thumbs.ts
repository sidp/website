type Image = {depth: number, src: string};
type Thumbs = Record<string, {images: Image[], flattened: string}>;

const thumbs: Thumbs = {
	'svt-dold': {
		images: [
			{
				depth: 1.0,
				src: '/images/thumbs/dold/ui.png',
			},
			{
				depth: -0.5,
				src: '/images/thumbs/dold/background.jpg',
			},
		],
		flattened: '/images/thumbs/dold/flattened.jpg',
	},
	'svenska-lopare': {
		images: [
			{
				depth: 0.7,
				src: '/images/thumbs/svenska-lopare/text.png',
			},
			{
				depth: 0,
				src: '/images/thumbs/svenska-lopare/ui.png',
			},
			{
				depth: -0.5,
				src: '/images/thumbs/svenska-lopare/picture.jpg',
			},
		],
		flattened: '/images/thumbs/svenska-lopare/flattened.jpg',
	},
	'utmanare-redo': {
		images: [
			{
				depth: 2.5,
				src: '/images/thumbs/utmanare-redo/clouds.png',
			},
			{
				depth: 0.4,
				src: '/images/thumbs/utmanare-redo/logo.png',
			},
			{
				depth: -1.0,
				src: '/images/thumbs/utmanare-redo/background.jpg',
			},
		],
		flattened: '/images/thumbs/utmanare-redo/flattened.jpg',
	},
	'needs-more-jpeg': {
		images: [
			{
				depth: 2.0,
				src: '/images/thumbs/needs-more-jpeg/win95.png',
			},
			{
				depth: 0.4,
				src: '/images/thumbs/needs-more-jpeg/text.png',
			},
			{
				depth: -1.0,
				src: '/images/thumbs/needs-more-jpeg/background.jpg',
			},
		],
		flattened: '/images/thumbs/needs-more-jpeg/flattened.jpg',
	},
	'match-machine': {
		images: [
			{
				depth: 1.4,
				src: '/images/thumbs/match-machine/text.png',
			},
			{
				depth: 1.0,
				src: '/images/thumbs/match-machine/heart.png',
			},
			{
				depth: 0.4,
				src: '/images/thumbs/match-machine/banner.png',
			},
			{
				depth: -1.0,
				src: '/images/thumbs/match-machine/background.jpg',
			},
		],
		flattened: '/images/thumbs/match-machine/flattened.jpg',
	},
};

export default thumbs;
