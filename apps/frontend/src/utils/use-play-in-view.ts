import { type RefObject, useEffect } from 'react';

/**
 * Plays the referenced video while it is in the viewport and pauses it when it
 * scrolls out. Pauses and skips observing while `enabled` is false so callers
 * can gate playback on reduced-motion or an autoplay setting.
 */
export function usePlayInView(
	ref: RefObject<HTMLVideoElement | null>,
	enabled: boolean,
) {
	useEffect(() => {
		const video = ref.current;

		if (!video) {
			return;
		}

		if (!enabled) {
			video.pause();
			return;
		}

		video.muted = true;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) {
					return;
				}

				if (entry.isIntersecting) {
					video.play().catch(() => {});
				} else {
					video.pause();
				}
			},
			{ threshold: 0 },
		);

		observer.observe(video);

		return () => observer.disconnect();
	}, [ref, enabled]);
}
