import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const productModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    serialNumber: {
      type: String,
      required: false,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    details: {
      color: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategorySchema",
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;
