'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { disableDraftMode } from '../app/actions';

const DisableDraftMode = () => {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (window !== window.parent || !window.opener) {
			setShow(true);
		}
	}, []);

	const disable = () =>
		startTransition(async () => {
			await disableDraftMode();
			router.refresh();
		});

	if (!show) {
		return null;
	}

	return (
		<div>
			<button type="button" onClick={disable} disabled={pending}>
				{pending ? 'Disabling draft mode...' : 'Disable draft mode'}
			</button>
		</div>
	);
};

export default DisableDraftMode;
