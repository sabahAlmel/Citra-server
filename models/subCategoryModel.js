import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const subCategoryModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
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

const SubCategorySchema = mongoose.model(
  "SubCategorySchema",
  subCategoryModelSchema
);

export default SubCategorySchema;
