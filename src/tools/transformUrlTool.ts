import { initCloudinary } from '../cloudinaryClient.js';

interface TransformArgs {
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  gravity?: string;
  flags?: string[];
}

export async function transformUrlTool(args: TransformArgs) {
  initCloudinary();
  const { public_id, ...rest } = args;

  const transformation: any = {};
  if (rest.width) transformation.width = rest.width;
  if (rest.height) transformation.height = rest.height;
  if (rest.crop) transformation.crop = rest.crop;
  if (rest.quality) transformation.quality = rest.quality;
  if (rest.gravity) transformation.gravity = rest.gravity;
  if (rest.flags?.length) transformation.flags = rest.flags.join('.');

  const { v2: cloudinary } = await import('cloudinary');
  const url = cloudinary.url(public_id, {
    transformation: [transformation],
    secure: true,
    format: rest.format
  });

  return { url };
}