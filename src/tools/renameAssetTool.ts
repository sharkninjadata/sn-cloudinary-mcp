import { initCloudinary } from '../cloudinaryClient.js';

interface RenameArgs {
  from_public_id: string;
  to_public_id: string;
  overwrite?: boolean;
  invalidate?: boolean;
}

export async function renameAssetTool(args: RenameArgs) {
  const cloudinary = initCloudinary();
  const { from_public_id, to_public_id, overwrite, invalidate } = args;

  const res = await cloudinary.uploader.rename(from_public_id, to_public_id, {
    overwrite,
    invalidate
  });

  return { public_id: res.public_id, old_public_id: from_public_id };
}