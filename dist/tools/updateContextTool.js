import { initCloudinary } from '../cloudinaryClient.js';
export async function updateContextTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, context } = args;
    const contextPairs = Object.entries(context).map(([k, v]) => `${k}=${v}`).join('|');
    const res = await cloudinary.uploader.add_context(contextPairs, [public_id]);
    return { public_id, context: res.context };
}
