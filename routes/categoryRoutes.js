import express from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

export const categoryrRouter = express.Router();

categoryrRouter.post("/create", createCategory);
categoryrRouter.get("/getone/:id", getCategoryByID);
categoryrRouter.get("/getall", getAllCategories);
categoryrRouter.put("/update", updateCategory);
categoryrRouter.delete("/delete", deleteCategory);
