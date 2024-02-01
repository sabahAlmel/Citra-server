import ProductSchema from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";

function removeImage(image) {
  fs.unlinkSync("images/" + image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

export const getAllNoPagination = async (req, res, next) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

// Fetch all Products
export const getAll = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const allProducts = await ProductSchema.find()
      .populate("categoryID", "name")
      .populate("subCategoryID", "name")
      .skip(skip)
      .limit(limit);
    if (!allProducts || allProducts.length == 0) {
      return res.status(404).send(" no more products to show !");
    }
    return res.status(200).json({ products: allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch products" });
  }
};

export const getNumber = async (req, res) => {
  let number;
  try {
    const allProducts = await ProductSchema.find();
    number = allProducts.length == 0 ? 1 : allProducts.length;
    return res.status(200).json({ number: number });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot get number of products" });
  }
};

// Fetch one product by slug
export const getOne = async (req, res) => {
  const slug = req.params.slug;
  try {
    const product = await ProductSchema.findOne({ slug: slug });

    if (product) {
      return res.json({
        message: "Fetched one product",
        fetchedProduct: product,
      });
    } else {
      return res.status(404).json({ error: "Product Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!" });
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
      details,
      type,
      description,
      arabicName,
      subCategory,
      category,
    } = req.body;
    const images = req.files ? req.files.map((image) => image.filename) : null;

    if (req.files) {
      await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            arabicName: arabicName,
            name: name,
            price: price,
            serialNumber: serialNumber,
            images: images,
            details: details,
            type: type,
            description: description,
            subCategoryID: subCategory,
            categoryID: category,
          },
        }
      );
    } else {
      await ProductSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            arabicName: arabicName,
            name: name,
            price: price,
            serialNumber: serialNumber,
            details: details,
            type: type,
            description: description,
            subCategoryID: subCategory,
            categoryID:category
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
    const product = await ProductSchema.findOneAndDelete({ _id: id });
    if (product) {
      console.log(product);
      if (product.images) {
        product.images.map((image) => removeImage(image));
      }
      return res.status(200).json({ message: "deleted successfully !" });
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "error deleting product", error: err });
  }
};
//create product

export const createProduct = async (req, res) => {
  try {
    const {
      arabicName,
      name,
      price,
      serialNumber,
      details,
      type,
      description,
      subCategoryID,
      categoryID,
    } = req.body;
    const images = req.files ? req.files.map((image) => image.filename) : null;
    // const detail = JSON.parse(details);
    const newProduct = new ProductSchema({
      arabicName: arabicName,
      name: name,
      price: price,
      serialNumber: serialNumber,
      details: details,
      images: images,
      type: type,
      description: description,
      subCategoryID: subCategoryID,
      categoryID: categoryID,
    });
    await newProduct.save();
    res
      .status(200)
      .json({ message: "product added successfully !", product: newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem adding product", error: err });
  }
};

// search product by name

export const searchProduct = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const { search } = req.body;
    const searchRegex = new RegExp(search, "i");
    const foundProducts = await ProductSchema.find({
      arabicName: searchRegex,
    })
      .skip(skip)
      .limit(limit);
    if (!foundProducts || foundProducts.length == 0) {
      return res.status(404).send(" no more products to show !");
    }
    res
      .status(200)
      .json({ message: " products found !", products: foundProducts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error searching for product", error: err });
  }
};

// get by category

export const getByCategory = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const categoryID = req.params.categoryID;
    const fetchedProducts = await ProductSchema.find({
      categoryID: categoryID,
    })
      .populate("categoryID")
      .skip(skip)
      .limit(limit);
    if (!fetchedProducts || fetchedProducts.length == 0) {
      return res.status(404).send(" no more products to show !");
    }
    res.status(200).json({
      message: `fetched products under ${fetchedProducts[0].categoryID.name} :`,
      products: fetchedProducts,
    });
  } catch (err) {
    res.status(500).json({ message: "error fetching products", error: err });
  }
};

//get products by sub category

export const getBySubCategory = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const subCategoryIDs = req.params.subCategoryID.split(",");

    const fetchedProducts = await ProductSchema.find({
      subCategoryID: { $in: subCategoryIDs },
    })
      .populate("subCategoryID")
      .skip(skip)
      .limit(limit);

    if (!fetchedProducts || fetchedProducts.length === 0) {
      return res.status(404).send("No more products to show!");
    }

    res.status(200).json({
      message: `Fetched products under selected subcategories:`,
      products: fetchedProducts,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

//get products by sub category

export const getLastEight = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find().sort({ _id: -1 }).limit(8);
    if (!allProducts || allProducts.length == 0) {
      return res.status(404).send("No products found!");
    }
    return res.status(200).json({ products: allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot fetch products" });
  }
};

//delete all

export const deleteAll = async (req, res) => {
  try {
    await ProductSchema.deleteMany({});
    res.status(200).json({ message: "deleted all products succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
