import { initCloudinary } from '../cloudinaryClient.js';
export async function transformUrlTool(args) {
    initCloudinary();
    const { public_id, ...rest } = args;
    const transformation = {};
    if (rest.width)
        transformation.width = rest.width;
    if (rest.height)
        transformation.height = rest.height;
    if (rest.crop)
        transformation.crop = rest.crop;
    if (rest.quality)
        transformation.quality = rest.quality;
    if (rest.gravity)
        transformation.gravity = rest.gravity;
    if (rest.flags?.length)
        transformation.flags = rest.flags.join('.');
    const { v2: cloudinary } = await import('cloudinary');
    const url = cloudinary.url(public_id, {
        transformation: [transformation],
        secure: true,
        format: rest.format
    });
    return { url };
}
