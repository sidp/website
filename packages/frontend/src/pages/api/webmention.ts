import { NextApiRequest, NextApiResponse } from 'next';
import { Mention } from '../../types';
import { apiPost } from '../../utils/api';

export default async function webmention(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		res.statusCode = 405;
		return res.end('405 Method Not Allowed');
	}

	const m = {
		source: req.body.source,
		target: req.body.target,
	};

	if (!m.source || !m.target) {
		res.statusCode = 422;
		return res.end('422 Unprocessable Entity');
	}

	const mention = await apiPost<Mention>('mentions/upsert', m);

	return res.end();
}
