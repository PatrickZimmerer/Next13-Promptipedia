import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	console.log({ params });
	try {
		await connectToDB();
		const prompts = await Prompt.find({ creator: params.id }).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 201 });
	} catch (error) {
		return new Response('Failed to fetch this Prompt', { status: 500 });
	}
};
