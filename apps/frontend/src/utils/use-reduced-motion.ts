import { useEffect, useState } from 'react';

export function useReducedMotion() {
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(query.matches);

		const onChange = (event: MediaQueryListEvent) =>
			setReducedMotion(event.matches);
		query.addEventListener('change', onChange);

		return () => query.removeEventListener('change', onChange);
	}, []);

	return reducedMotion;
}
