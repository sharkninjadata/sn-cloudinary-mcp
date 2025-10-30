import { initCloudinary } from '../cloudinaryClient.js';

interface DeleteTagsArgs {
  public_id: string;
  tags: string[];
}

export async function deleteTagsTool(args: DeleteTagsArgs) {
  const cloudinary = initCloudinary();
  const { public_id, tags } = args;

  for (const tag of tags) {
    await cloudinary.uploader.remove_tag(tag, [public_id]);
  }

  return { public_id, removed: tags };
}