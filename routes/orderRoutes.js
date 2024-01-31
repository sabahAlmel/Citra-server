import {
  createOrder,
  getOneOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import express from "express";

export const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/all", getAllOrders);
orderRouter.get("/:id", getOneOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);
