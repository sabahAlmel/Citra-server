import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

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
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  { timestamps: true }
);

const CategorySchema = mongoose.model("CategorySchema", categoryModelSchema);

export default CategorySchema;
