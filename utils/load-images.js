export default function loadImages(images = [], callback = () => {}) {
	let loaded = 0;
	let successfully = 0;

	const eventHandler = function (ev) {
		if (ev.type === 'load') {
			successfully += 1;
		}

		loaded += 1;
		if (loaded === images.length) {
			const error = loaded !== successfully;
			callback(error);
		}
	}

	const imageElements = [];
	for (let i = 0; i < images.length; i++) {
		const imageElement = document.createElement('img');
		imageElement.src = images[i];
		imageElement.onload = eventHandler;
		imageElement.onerror = eventHandler;
	}
}
