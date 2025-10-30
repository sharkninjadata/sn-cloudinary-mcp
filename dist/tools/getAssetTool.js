import { initCloudinary } from '../cloudinaryClient.js';
export async function getAssetTool(args) {
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
