export default function isNearViewport(element, margin = 50) {
	if (!element) {
		return false;
	}

	const rect = element.getBoundingClientRect();

	// IE <9 doesn’t return width and height
	if (!rect.width) {
		return true;
	}

	return (
		rect.top + rect.height + margin > 0 &&
		rect.left + rect.width + margin > 0 &&
		(window.innerHeight - rect.bottom) + rect.height + margin > 0 &&
		(window.innerWidth - rect.right) + rect.width + margin > 0
	);
}
