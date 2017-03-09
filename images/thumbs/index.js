const thumbs = {
	dold: {
		images: [
			{
				depth: 1.0,
				src: require('./dold/ui.png'),
			},
			{
				depth: -0.5,
				src: require('./dold/background.jpg'),
			},
		],
		flattened: require('./dold/flattened.jpg'),
	},
	'utmanare-redo': {
		images: [
			{
				depth: 2.5,
				src: require('./utmanare-redo/clouds.png'),
			},
			{
				depth: 0.4,
				src: require('./utmanare-redo/logo.png'),
			},
			{
				depth: -1.0,
				src: require('./utmanare-redo/background.jpg'),
			},
		],
		flattened: require('./utmanare-redo/flattened.jpg'),
	},
	'needs-more-jpeg': {
		images: [
			{
				depth: 2.0,
				src: require('./needs-more-jpeg/win95.png'),
			},
			{
				depth: 0.4,
				src: require('./needs-more-jpeg/text.png'),
			},
			{
				depth: -1.0,
				src: require('./needs-more-jpeg/background.jpg'),
			},
		],
		flattened: require('./needs-more-jpeg/flattened.jpg'),
	},
};

export default thumbs;
