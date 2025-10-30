import { initCloudinary } from '../cloudinaryClient.js';
export async function addTagsTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, tags } = args;
    for (const tag of tags) {
        await cloudinary.uploader.add_tag(tag, [public_id]);
    }
    return { public_id, added: tags };
}
