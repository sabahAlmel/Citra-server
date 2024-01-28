import express from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);

categoryRouter.get("/getone/:id", getCategoryByID);
categoryRouter.get("/getall", getAllCategories);

categoryRouter.put("/update/:id", updateCategory);

categoryRouter.delete("/delete/:id", deleteCategory);
