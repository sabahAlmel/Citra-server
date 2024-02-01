import OrderSchema from "../models/orderModel.js";

//create order

export const createOrder = async (req, res) => {
  const {
    status,
    productID,
    orderNB,
    address,
    userID,
    updateDate,
    totalPrice,
  } = req.body;
  try {
    const newOrder = new OrderSchema({
      status,
      productID,
      orderNB,
      address,
      userID,
      updateDate,
      totalPrice,
    });
    await newOrder.save();
    res
      .status(200)
      .json({ message: "order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "could not place order !", error: err });
  }
};

//get order by id

export const getOneOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const fetchedOrder = await OrderSchema.findById({ _id: id });
    if (fetchedOrder) {
      res.status(200).json({ message: "order found !", order: fetchedOrder });
    } else {
      res.status(404).json({ message: "no such order !" });
    }
  } catch (err) {
    res.status(500).send({ message: "Could not fetch order", error: err });
  }
};

//get all orders

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderSchema.find();
    res
      .status(200)
      .json({ message: "orders fetched successfully !", orders: allOrders });
  } catch (err) {
    res.status(500).json({ message: "problem fetching ordersss", error: err });
  }
};

//update order
export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      status,
      productID,
      orderNB,
      address,
      userID,
      updateDate,
      totalPrice,
    } = req.body;
    const updatedOrder = await OrderSchema.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status,
          productID,
          orderNB,
          address,
          userID,
          updateDate,
          totalPrice,
        },
      }
    );
    res.status(200).json({
      message: "order updated successfully !",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ message: "problem updating order !" });
  }
};

//delete order

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await OrderSchema.deleteOne({ _id: id });
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    res.status(500).json({ message: " could not delete order !", error: err });
  }
};






