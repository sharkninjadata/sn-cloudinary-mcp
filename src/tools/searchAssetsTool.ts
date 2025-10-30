import { initCloudinary } from '../cloudinaryClient.js';

interface SearchArgs {
  expression: string;
  max_results?: number;
  next_cursor?: string;
}

export async function searchAssetsTool(args: SearchArgs) {
  const cloudinary = initCloudinary();
  const { expression, max_results = 30, next_cursor } = args;

  const res = await cloudinary.search
    .expression(expression)
    .max_results(max_results)
    .next_cursor(next_cursor || '')
    .execute();

  return {
    total_count: res.total_count,
    next_cursor: res.next_cursor,
    assets: res.resources.map(r => ({
      public_id: r.public_id,
      format: r.format,
      bytes: r.bytes,
      width: r.width,
      height: r.height,
      secure_url: r.secure_url,
      tags: r.tags
    }))
  };
}