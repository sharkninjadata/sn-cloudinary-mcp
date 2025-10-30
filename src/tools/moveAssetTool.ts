import { initCloudinary } from '../cloudinaryClient.js';

interface MoveArgs {
  public_id: string;
  to_folder: string;
  overwrite?: boolean;
  invalidate?: boolean;
}

export async function moveAssetTool(args: MoveArgs) {
  const cloudinary = initCloudinary();
  const { public_id, to_folder, overwrite, invalidate } = args;

  const basename = public_id.split('/').pop()!;
  const newPublicId = to_folder ? `${to_folder.replace(/\\+|\\/+/g, '/')}/${basename}` : basename;

  await cloudinary.uploader.rename(public_id, newPublicId, {
    overwrite,
    invalidate
  });

  return { new_public_id: newPublicId, old_public_id: public_id };
}