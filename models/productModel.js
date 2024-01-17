import mongoose from "mongoose";
import slugify from "slugify";
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
        required: false,
      },
    ],
    details: [
      {
        color: {
          type: String,
          required: true,
        },
        sizes: [
          {
            size: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
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
    slug: {
      type: String,
      unique: false,
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
  { timestamps: true }
);

productModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;

// [{"color":"red", "sizes":[{"size":"small", "quantity":9},{"size":"medium", "quantity":20}]},{"color":"blue", "sizes":[{"size":"small", "quantity":9}]},{"color":"brown", "sizes":[{"size":"large", "quantity":10},{"size":"medium", "quantity":20}]},{"color":"brown", "sizes":[{"size":"large", "quantity":10},{"size":"medium", "quantity":20}]}]
