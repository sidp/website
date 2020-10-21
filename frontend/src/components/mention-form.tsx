import * as React from 'react';
import { useRouter } from 'next/router';
import { absoluteUrl } from '../utils/url';
import styled from 'styled-components';
import Input from './input';
import Button from './button';
import InputGroup from './input-group';

const MentionForm = () => {
	const router = useRouter();
	const [showForm, setShowForm] = React.useState(false);
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

	if (!showForm) {
		return (
			<>
				<Button primary onClick={() => setShowForm(true)}>
					Submit mention
				</Button>
			</>
		);
	}

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
						Send a webmention manually by linking to this URL in your post and
						then pasting the URL to your post here.
					</p>
					<HiddenLabel htmlFor="source">URL</HiddenLabel>
					<InputGroup>
						<Input
							type="url"
							name="source"
							id="source"
							value={url}
							onChange={(ev) => setUrl(ev.target.value)}
							placeholder="https://"
							required
						/>
						<input type="hidden" name="target" value={target} />
						<Button type="submit" disabled={state === 'submitting'} primary>
							Send
						</Button>
						<Button
							onClick={() => {
								setShowForm(false);
							}}
						>
							Cancel
						</Button>
					</InputGroup>
				</>
			)}
		</form>
	);
};

export default MentionForm;

const HiddenLabel = styled.label`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;
