import { Schema, model, models, Document } from "mongoose";

export interface IProduct extends Document {
  label: string;
  description: string;
  image: string;
  popular: boolean;
}

const productSchema = new Schema({
  label: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, required: true },
});

export default models.Product || model<IProduct>("Product", productSchema);
