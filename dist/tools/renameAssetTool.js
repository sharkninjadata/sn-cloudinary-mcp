import { initCloudinary } from '../cloudinaryClient.js';
export async function renameAssetTool(args) {
    const cloudinary = initCloudinary();
    const { from_public_id, to_public_id, overwrite, invalidate } = args;
    const res = await cloudinary.uploader.rename(from_public_id, to_public_id, {
        overwrite,
        invalidate
    });
    return { public_id: res.public_id, old_public_id: from_public_id };
}
