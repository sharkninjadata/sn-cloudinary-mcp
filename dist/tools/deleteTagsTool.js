import { initCloudinary } from '../cloudinaryClient.js';
export async function deleteTagsTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, tags } = args;
    for (const tag of tags) {
        await cloudinary.uploader.remove_tag(tag, [public_id]);
    }
    return { public_id, removed: tags };
}
