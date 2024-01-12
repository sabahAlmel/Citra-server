import express from "express";
import {
  getAll,
  getOne,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

export const userRouter = express.Router();

subCategoryRouter.get("/getone", getOne);
subCategoryRouter.get("/getall", getAll);

subCategoryRouter.patch("/:id", upload.array("image", 5), updateCategory);
subCategoryRouter.post("/create", upload.array("image", 5), createCategory);
subCategoryRouter.delete("/:id", deleteCategory);
