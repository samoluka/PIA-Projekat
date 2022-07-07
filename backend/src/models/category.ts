import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supercategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

Category.index({ name: 1, company: 1 }, { unique: true });

export default mongoose.model("Category", Category, "categories");
