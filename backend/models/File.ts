import mongoose, { Document } from "mongoose";

export interface IFile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: "file" | "folder";
  parentId: mongoose.Types.ObjectId | null;
  content?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new mongoose.Schema<IFile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
    content: {
      type: String,
      default: null,
      validate: {
        validator: function(this: IFile, value: string | null) {
          return this.type === "file" || value === null;
        },
        message: "Folders cannot have content"
      }
    }
  },
  { timestamps: true }
);

// Prevent duplicate names in the same folder for the same user
FileSchema.index({ userId: 1, parentId: 1, name: 1 }, { unique: true });

export default mongoose.models.File || mongoose.model<IFile>("File", FileSchema);
