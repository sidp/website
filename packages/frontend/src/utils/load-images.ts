export default function loadImages(images: string[] = [], callback = (error: boolean) => {}) {
	let imageElements = [];
	let loaded = 0;
	let successfully = 0;

	const eventHandler = function(ev) {
		if (ev.type === 'load') {
			successfully += 1;
		}

		loaded += 1;
		if (loaded === images.length) {
			const error = loaded !== successfully;
			callback(error);
			imageElements = null;
		}
	};

	for (let i = 0; i < images.length; i++) {
		const imageElement = document.createElement('img');
		imageElement.src = images[i];
		imageElement.onload = eventHandler;
		imageElement.onerror = eventHandler;
		imageElements.push(imageElements);
	}
}
