import express from "express";
import {
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

export const productRouter = express.Router();

productRouter.get("/getone", getOne);
productRouter.get("/getall", getAll);

productRouter.patch("/:id", upload.array("image", 5), updateProduct);
productRouter.post("/create", upload.array("image", 5), createProduct);
productRouter.delete("/:id", deleteProduct);
