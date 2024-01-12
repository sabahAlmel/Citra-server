import mongoose from "mongoose";

const orderModelSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSchema",
      required: true,
    },
    orderNB: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    updateDate: {
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
