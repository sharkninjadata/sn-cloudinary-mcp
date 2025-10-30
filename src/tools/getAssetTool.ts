import { initCloudinary } from '../cloudinaryClient.js';

interface GetArgs {
  public_id: string;
  resource_type?: 'image' | 'video' | 'raw';
}

export async function getAssetTool(args: GetArgs) {
  const cloudinary = initCloudinary();
  const { public_id, resource_type } = args;

  const res = await cloudinary.api.resource(public_id, { resource_type });

  return {
    public_id: res.public_id,
    url: res.url,
    secure_url: res.secure_url,
    format: res.format,
    width: res.width,
    height: res.height,
    bytes: res.bytes,
    tags: res.tags,
    context: res.context,
    derived: res.derived
  };
}