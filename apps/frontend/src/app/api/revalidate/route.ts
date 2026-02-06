import { parseBody } from 'next-sanity/webhook';
import { updateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

type WebhookPayload = {
	_type: string;
};

export async function POST(req: NextRequest) {
	try {
		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			req,
			process.env.SANITY_REVALIDATE_SECRET,
		);

		if (!isValidSignature) {
			const message = 'Invalid signature';
			return new Response(JSON.stringify({ message, isValidSignature, body }), {
				status: 401,
			});
		}

		if (!body?._type) {
			const message = 'Bad Request';
			return new Response(JSON.stringify({ message, body }), { status: 400 });
		}

		updateTag(body._type);

		return NextResponse.json({ body });
	} catch (error) {
		console.error(error);
		return new Response(
			error instanceof Error ? error.message : 'Unknown error',
			{ status: 500 },
		);
	}
}
