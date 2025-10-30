import { initCloudinary } from '../cloudinaryClient.js';

interface UpdateContextArgs {
  public_id: string;
  context: Record<string, string>;
}

export async function updateContextTool(args: UpdateContextArgs) {
  const cloudinary = initCloudinary();
  const { public_id, context } = args;

  const contextPairs = Object.entries(context).map(([k, v]) => `${k}=${v}`).join('|');
  const res = await cloudinary.uploader.add_context(contextPairs, [public_id]);

  return { public_id, context: res.context };
}