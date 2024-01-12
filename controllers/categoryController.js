import CategorySchema from "../models/categoryModel.js";

//create category

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new CategorySchema({
      name,
    });
    await newCategory.save();
    res
      .status(200)
      .json({ message: "Category created successfully", result: newCategory });
  } catch (err) {
    console.log(err);
    res.status(500).send("error creating category");
  }
};

//get category

export const getCategoryByID = async (req, res) => {
  const id = req.params.id;
  try {
    const fetchedCategory = await CategorySchema.findOne({ _id: id });
    if (fetchedCategory) {
      res
        .status(200)
        .json({ message: "Category found ! ", category: fetchedCategory });
    } else {
      res.status(404).json({ message: "Category does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error fetching category");
  }
};

//get all categories

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategorySchema.find();
    res.status(200).json({
      message: "the following is the list of categories",
      categories: allCategories,
    });
  } catch (err) {
    res.status(500).json({ message: "problem fetching categories !" });
  }
};

//update category

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name } }
    );
    res.status(200).json({
      message: "category updated successfully !",
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: "problem updating category !" });
  }
};

//delete category

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await CategorySchema.deleteOne({ _id: id });
    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: " could not delete category !", error: err });
  }
};
