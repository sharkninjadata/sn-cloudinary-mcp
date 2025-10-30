import { initCloudinary } from '../cloudinaryClient.js';

interface DeleteArgs {
  public_id: string;
  resource_type?: 'image' | 'video' | 'raw';
  invalidate?: boolean;
}

export async function deleteAssetTool(args: DeleteArgs) {
  const cloudinary = initCloudinary();
  const { public_id, resource_type, invalidate } = args;

  const res = await cloudinary.uploader.destroy(public_id, {
    resource_type,
    invalidate
  });

  return { result: res.result };
}