import mongoose from "mongoose";

const subCategoryModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId, // Field type
    ref: "Category", // Reference to the "Author" collection
    required: true, // Must be provided
  },
 
} ,{ timestamps: true });

const SubCategorySchema = mongoose.model(
  "SubCategorySchema",
  subCategoryModelSchema
);

export default SubCategorySchema;
