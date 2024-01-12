import mongoose from "mongoose";

const categoryModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const CategorySchema = mongoose.model("CategorySchema", categoryModelSchema);

export default CategorySchema;
