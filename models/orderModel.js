import mongoose from "mongoose";

const orderModelSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderSchema = mongoose.model("OrderSchema", orderModelSchema);

export default OrderSchema;
