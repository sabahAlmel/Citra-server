import express from "express";
import {
  getAll,
  getOne,
  createSubCateg,
  deleteSubCateg,
  updateSubCateg,
} from "../controllers/subCategoryController.js";

export const subCategoryRouter = express.Router();

subCategoryRouter.get("/getone/:id", getOne);
subCategoryRouter.get("/getall", getAll);

subCategoryRouter.patch("/:id",  updateSubCateg);
subCategoryRouter.post("/create", createSubCateg);
subCategoryRouter.delete("/:id", deleteSubCateg);
