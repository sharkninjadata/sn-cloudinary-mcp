import { initCloudinary } from '../cloudinaryClient.js';
/**
 * Move an asset to a different folder by renaming its public_id.
 * Cloudinary doesn’t have a direct “move” API; we emulate via rename.
 * - Normalizes backslashes to forward slashes.
 * - Collapses repeated slashes.
 * - Trims leading/trailing slashes.
 */
export async function moveAssetTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, to_folder, overwrite, invalidate } = args;
    // Extract basename (final segment after slash)
    const basename = public_id.split('/').pop();
    // Sanitize target folder: replace backslashes, collapse multiple slashes, trim
    const sanitizedFolder = to_folder
        .replace(/\\/g, '/') // convert all backslashes to forward slashes
        .replace(/\/+/g, '/') // collapse multiple forward slashes
        .replace(/^\/+|\/+$/g, ''); // trim leading/trailing slashes
    const newPublicId = sanitizedFolder ? `${sanitizedFolder}/${basename}` : basename;
    const res = await cloudinary.uploader.rename(public_id, newPublicId, {
        overwrite,
        invalidate
    });
    return {
        new_public_id: res.public_id,
        old_public_id: public_id
    };
}
