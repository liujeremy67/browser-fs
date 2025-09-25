import mongoose, { Document, Model } from "mongoose";
// mongoose document ~ sql row

export interface IUser extends Document {
  username: string;
  passwordHash: string;
}
// blueprint vs constraints
const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;