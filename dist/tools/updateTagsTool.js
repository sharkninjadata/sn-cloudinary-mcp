import { initCloudinary } from '../cloudinaryClient.js';
export async function updateTagsTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, tags } = args;
    const current = await cloudinary.api.resource(public_id);
    const currentTags = current.tags || [];
    const toRemove = currentTags.filter((t) => !tags.includes(t));
    for (const t of toRemove) {
        await cloudinary.uploader.remove_tag(t, [public_id]);
    }
    const toAdd = tags.filter((t) => !currentTags.includes(t));
    for (const t of toAdd) {
        await cloudinary.uploader.add_tag(t, [public_id]);
    }
    return { public_id, tags };
}
