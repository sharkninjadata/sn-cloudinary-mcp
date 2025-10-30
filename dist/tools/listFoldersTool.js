import { initCloudinary } from '../cloudinaryClient.js';
export async function listFoldersTool(args) {
    const cloudinary = initCloudinary();
    const { path } = args;
    const res = await cloudinary.api.sub_folders(path || '');
    return {
        folders: (res.folders || []).map((f) => ({
            name: f.name,
            path: f.path
        }))
    };
}
