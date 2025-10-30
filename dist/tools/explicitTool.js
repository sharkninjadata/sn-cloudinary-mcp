import { initCloudinary } from '../cloudinaryClient.js';
export async function explicitTool(args) {
    const cloudinary = initCloudinary();
    const { public_id, type = 'upload', eager } = args;
    const eagerTransforms = eager?.map(t => {
        const parts = [];
        if (t.width)
            parts.push(`w_${t.width}`);
        if (t.height)
            parts.push(`h_${t.height}`);
        if (t.crop)
            parts.push(`c_${t.crop}`);
        if (t.format)
            parts.push(`f_${t.format}`);
        return parts.join(',');
    });
    const res = await cloudinary.uploader.explicit(public_id, {
        type,
        eager: eagerTransforms
    });
    return { public_id: res.public_id, derived: res.derived };
}
