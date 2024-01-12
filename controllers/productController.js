import ProductSchema from "../models/productModel.js";
import mongoose from "mongoose";

// Fetch all Products
export const getAll = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find();
    return res.status(200).json({ products: allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch products" });
  }
};

// Fetch one product by ID
export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such product!" });
    }
    const product = await ProductSchema.findById({ _id: id });
    if (product) {
      return res.json("fetched one product", { fetchedProduct: product });
    } else {
      return res.status(404).json({ error: "Product Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server err!" });
  }
};

// Update Product

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  try {
    const {
      name,
      price,
      serialNumber,
      color,
      size,
      type,
      description,
      quantity,
    } = req.body;
    const images = req.files.map((image) => image.filename);

    if (req.files) {
      await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            price: price,
            serialNumber: serialNumber,
            images: images,
            details: {
              color: color,
              size: size,
              type: type,
              description: description,
            },
            quantity: quantity,
          },
        }
      );
    } else {
      await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            price: price,
            serialNumber: serialNumber,
            details: {
              color: color,
              size: size,
              type: type,
              description: description,
            },
            quantity: quantity,
          },
        }
      );
    }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Trouble updating Product info" });
  }
};

// Delete product

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await ProductSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete product" });
  }
};

//create product

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      serialNumber,
      color,
      size,
      type,
      description,
      quantity,
      subCategoryID,
      categoryID,
    } = req.body;
    const images = req.files.map((image) => image.filename);

    console.log("Received Request Body:", req.body);
    console.log("Received Request File:", req.files);
    const newProduct = new ProductSchema({
      name,
      price,
      serialNumber,
      details: {
        color: color,
        size: size,
        type: type,
        description: description,
      },
      quantity,
      images: images,
      subCategoryID,
      categoryID,
    });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "product added successfully !", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "problem adding product", error: err });
  }
};
