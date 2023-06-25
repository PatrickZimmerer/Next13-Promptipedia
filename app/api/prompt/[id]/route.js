import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params._id).populate('creator');
		if (!prompt) return new Response('Prompt not found', { status: 404 });
		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch this Prompt', { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();
	try {
		await connectToDB();
		const existingPrompt = await Prompt.findById(params._id).populate('creator');
		if (!existingPrompt) return new Response('Prompt not found', { status: 404 });
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;
		await existingPrompt.save();
		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to update this Prompt', { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(params._id);
		return new Response('Prompt deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to delete this Prompt', { status: 500 });
	}
};