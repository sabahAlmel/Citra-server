import express from "express";
import {
  getAll,
  getOne,
  createSubCateg,
  deleteSubCateg,
  updateSubCateg,
} from "../controllers/subCategoryController.js";
import upload from "../middlewares/multer.js";

export const subCategoryRouter = express.Router();

subCategoryRouter.get("/getone", getOne);
subCategoryRouter.get("/getall", getAll);

subCategoryRouter.patch("/:id", upload.array("image", 5), updateSubCateg);
subCategoryRouter.post("/create", upload.array("image", 5), createSubCateg);
subCategoryRouter.delete("/:id", deleteSubCateg);
