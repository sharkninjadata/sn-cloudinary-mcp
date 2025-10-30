import { initCloudinary } from '../cloudinaryClient.js';
export async function deleteAssetTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, resource_type, invalidate } = args;
    const res = await cloudinary.uploader.destroy(public_id, {
        resource_type,
        invalidate
    });
    return { result: res.result };
}
