import qs from 'qs';

export const apiGet = async <T>(
	path: string,
	query?: any,
	init?: RequestInit,
) => {
	const res = await fetch(
		process.env.BACKEND_API + path + (query ? '?' + qs.stringify(query) : ''),
		init,
	);
	return (await res.json()) as T;
};

export const apiPost = async <T>(
	path: string,
	body?: any,
	init?: RequestInit,
) => {
	const res = await fetch(process.env.BACKEND_API + path, {
		method: 'post',
		body,
		...init,
	});

	return (await res.json()) as T;
};

export default apiGet;
