import express from "express";
import {
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

export const userRouter = express.Router();

productRouter.get("/getone", getOne);
productRouter.get("/getall", getAll);

productRouter.patch("/:id", upload.single("image"), updateProduct);
productRouter.post("/create", upload.single("image"), createProduct);
productRouter.delete("/:id", deleteProduct);
