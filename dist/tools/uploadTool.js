import { initCloudinary } from '../cloudinaryClient.js';
import fs from 'node:fs/promises';
export async function uploadTool(args) {
    const cloudinary = initCloudinary();
    const { source, ...options } = args;
    let uploadSource = source;
    if (/^(\.?\.?\/|[A-Za-z]:\\)/.test(source)) {
        const fileBuffer = await fs.readFile(source);
        uploadSource = 'data:application/octet-stream;base64,' + fileBuffer.toString('base64');
    }
    const result = await cloudinary.uploader.upload(uploadSource, {
        public_id: options.public_id,
        folder: options.folder,
        tags: options.tags,
        resource_type: options.resource_type,
        overwrite: options.overwrite,
        invalidate: options.invalidate
    });
    return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        bytes: result.bytes,
        format: result.format,
        width: result.width,
        height: result.height,
        created_at: result.created_at,
        tags: result.tags
    };
}
