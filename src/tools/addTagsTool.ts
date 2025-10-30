import { initCloudinary } from '../cloudinaryClient.js';

interface AddTagsArgs {
  public_id: string;
  tags: string[];
}

export async function addTagsTool(args: AddTagsArgs) {
  const cloudinary = initCloudinary();
  const { public_id, tags } = args;

  for (const tag of tags) {
    await cloudinary.uploader.add_tag(tag, [public_id]);
  }

  return { public_id, added: tags };
}