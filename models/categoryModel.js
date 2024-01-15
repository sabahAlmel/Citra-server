import mongoose from "mongoose";

const categoryModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: true,
    },
  },
  { timestamps: true }
);

const CategorySchema = mongoose.model("CategorySchema", categoryModelSchema);

export default CategorySchema;
