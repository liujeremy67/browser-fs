import File, { IFile } from "../models/File";
import { Types } from "mongoose";

// Create folder
// export: make visible to other files and modules. like public in c++
// promise: value that will eventually resolve to number from async op
export async function createFolder(
  userId: Types.ObjectId | string,
  name: string,
  parentId: Types.ObjectId | string | null = null
): Promise<IFile> {
  return await File.create({ userId, name, type: "folder", parentId });
}

// Recursive delete
// promise used here so we wait for op to finish
export async function deleteRecursive(
  fileId: Types.ObjectId | string,
  userId: Types.ObjectId | string
): Promise<void> {
  const children: IFile[] = await File.find({ parentId: fileId, userId });
  for (const child of children) {
    await deleteRecursive(child._id, userId);
  }
  await File.deleteOne({ _id: fileId, userId });
}

// Ensure root folder exists
export async function ensureRootFolder(
  userId: Types.ObjectId | string
): Promise<IFile> {
  let root: IFile | null = await File.findOne({ userId, parentId: null });
  if (!root) root = await createFolder(userId, "/", null);
  return root;
}
