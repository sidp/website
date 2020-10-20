import * as React from 'react';
import { useRouter } from 'next/router';
import { absoluteUrl } from '../utils/url';

const MentionForm = () => {
	const router = useRouter();
	const [url, setUrl] = React.useState('');
	const [state, setState] = React.useState<
		'filling' | 'submitting' | 'error' | 'submitted'
	>('filling');

	const target = absoluteUrl(router.asPath);

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setState('submitting');

		const res = await fetch('/webmention', {
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `source=${encodeURIComponent(url)}&target=${encodeURIComponent(
				target
			)}`,
		});

		if (res.ok) {
			setUrl('');
			setState('submitted');
		} else {
			setState('error');
		}
	};

	return (
		<form onSubmit={handleSubmit} method="post" action="/webmention">
			{state === 'submitted' && (
				<>
					<p>
						Thank you for your mention. It’s in the processing queue and will
						show up here in a bit.
					</p>
					<p>
						<button onClick={(ev) => setState('filling')}>Ok</button>
					</p>
				</>
			)}
			{state === 'error' && (
				<p>Dang! There was an error submitting the form.</p>
			)}
			{state !== 'submitted' && (
				<>
					<p>
						Send a webmention manually by linking to this page in your post and
						pasting your URL here:
					</p>
					<label>
						URL
						<br />
						<input
							type="url"
							name="source"
							value={url}
							onChange={(ev) => setUrl(ev.target.value)}
							required
						/>
					</label>
					<input type="hidden" name="target" value={target} />
					<input type="submit" value="Send" disabled={state === 'submitting'} />
				</>
			)}
		</form>
	);
};

export default MentionForm;
