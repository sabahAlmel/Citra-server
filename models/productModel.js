import mongoose from "mongoose";

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
    image: {
      type: String,
      required: true,
    },
    details: {
      color: {
        type: string,
        required: false,
      },
      size: {
        type: string,
        required: false,
      },
      type: {
        type: string,
        required: false,
      },
      description: {
        type: string,
        required: false,
      },
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId, // Field type
      ref: "SubCategory", // Reference to the "Author" collection
      required: true, // Must be provided
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;
