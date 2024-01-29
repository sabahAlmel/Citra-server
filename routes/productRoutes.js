import express from "express";
import {
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
  createProduct,
  searchProduct,
  getByCategory,
  getBySubCategory,
  deleteAll,
  getNumber,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

export const productRouter = express.Router();

productRouter.get("/getone/:slug", getOne);
productRouter.get("/getall", getAll);
productRouter.get("/getNumber", getNumber);
productRouter.post("/search", searchProduct);
productRouter.get("/bycategory/:categoryID", getByCategory);
productRouter.get("/bysubcategory/:subCategoryID", getBySubCategory);

productRouter.patch("/:id", upload.array("image", 5), updateProduct);
productRouter.post("/create", upload.array("image", 5), createProduct);
productRouter.delete("/thanos", deleteAll);
productRouter.delete("/:id", deleteProduct);
