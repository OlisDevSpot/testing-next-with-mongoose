import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default models.User || model<IUser>("User", userSchema);
