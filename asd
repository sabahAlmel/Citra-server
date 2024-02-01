[1mdiff --git a/controllers/orderController.js b/controllers/orderController.js[m
[1mindex 5926f57..38123df 100644[m
[1m--- a/controllers/orderController.js[m
[1m+++ b/controllers/orderController.js[m
[36m@@ -61,9 +61,47 @@[m [mexport const getAllOrders = async (req, res) => {[m
 };[m
 [m
 //update order[m
[32m+[m[32m// export const updateOrder = async (req, res) => {[m
[32m+[m[32m//   try {[m
[32m+[m[32m//     const id = req.params.id;[m
[32m+[m[32m//     const {[m
[32m+[m[32m//       status,[m
[32m+[m[32m//       productID,[m
[32m+[m[32m//       orderNB,[m
[32m+[m[32m//       address,[m
[32m+[m[32m//       userID,[m
[32m+[m[32m//       updateDate,[m
[32m+[m[32m//       totalPrice,[m
[32m+[m[32m//     } = req.body;[m
[32m+[m[32m//     const updatedOrder = await OrderSchema.findByIdAndUpdate([m
[32m+[m[32m//       { _id: id },[m
[32m+[m[32m//       {[m
[32m+[m[32m//         $set: {[m
[32m+[m[32m//           status,[m
[32m+[m[32m//           productID,[m
[32m+[m[32m//           orderNB,[m
[32m+[m[32m//           address,[m
[32m+[m[32m//           userID,[m
[32m+[m[32m//           updateDate,[m
[32m+[m[32m//           totalPrice,[m
[32m+[m[32m//         },[m
[32m+[m
[32m+[m[32m//       },       { new: true }[m
[32m+[m[32m//     );[m
[32m+[m[32m//     res.status(200).json({[m
[32m+[m[32m//       message: "order updated successfully !",[m
[32m+[m[32m//       order: updatedOrder,[m
[32m+[m[32m//     });[m
[32m+[m[32m//   } catch (err) {[m
[32m+[m[32m//     res.status(500).json({ message: "problem updating order !" });[m
[32m+[m[32m//   }[m
[32m+[m[32m// };[m
[32m+[m[32m// update the user[m
 export const updateOrder = async (req, res) => {[m
[32m+[m[32m  const id = req.params.id;[m
[32m+[m[32m  console.log("Updating order with ID:", id);[m
[32m+[m
   try {[m
[31m-    const id = req.params.id;[m
     const {[m
       status,[m
       productID,[m
[36m@@ -73,40 +111,47 @@[m [mexport const updateOrder = async (req, res) => {[m
       updateDate,[m
       totalPrice,[m
     } = req.body;[m
[31m-    const updatedOrder = await OrderSchema.findByIdAndUpdate([m
[32m+[m
[32m+[m[32m    const updatedResult = await OrderSchema.findByIdAndUpdate([m
       { _id: id },[m
       {[m
[31m-        $set: {[m
[31m-          status,[m
[31m-          productID,[m
[31m-          orderNB,[m
[31m-          address,[m
[31m-          userID,[m
[31m-          updateDate,[m
[31m-          totalPrice,[m
[31m-        },[m
[31m-      }[m
[32m+[m[32m        status,[m
[32m+[m[41m        [m
[32m+[m[32m        productID,[m
[32m+[m[32m        orderNB,[m
[32m+[m[32m        address,[m
[32m+[m[32m        userID,[m
[32m+[m[32m        updateDate,[m
[32m+[m[32m        totalPrice,[m
[32m+[m[32m      },[m
[32m+[m[32m      { new: true } // Return the updated document[m
     );[m
[32m+[m
[32m+[m[32m    if (!updatedResult) {[m
[32m+[m[32m      return res.status(404).json({ message: "Order not found" });[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    console.log(updatedResult);[m
     res.status(200).json({[m
[31m-      message: "order updated successfully !",[m
[31m-      order: updatedOrder,[m
[32m+[m[32m      message: "Order updated successfully!",[m
[32m+[m[32m      order: updatedResult,[m
     });[m
[31m-  } catch (err) {[m
[31m-    res.status(500).json({ message: "problem updating order !" });[m
[32m+[m[32m  } catch (error) {[m
[32m+[m[32m    console.error(error);[m
[32m+[m[32m    res.status(500).json({ error });[m
   }[m
 };[m
 [m
[32m+[m
 //delete order[m
 [m
 export const deleteOrder = async (req, res) => {[m
[32m+[m[32m  const id = req.params.id;[m
   try {[m
[31m-    const id = req.params.id;[m
[31m-    const deletedOrder = await OrderSchema.deleteOne({ _id: id });[m
[31m-    res.status(200).json({[m
[31m-      message: "Order deleted successfully",[m
[31m-      order: deletedOrder,[m
[31m-    });[m
[32m+[m[32m    await OrderSchema.deleteOne({ _id: id });[m
[32m+[m[32m    res.status(200).json({ message: "order deleted successfully" });[m
   } catch (err) {[m
[31m-    res.status(500).json({ message: " could not delete order !", error: err });[m
[32m+[m[32m    console.log(err);[m
[32m+[m[32m    res.status(500).json({ error: " could not delete user" });[m
   }[m
[31m-};[m
[32m+[m[32m};[m
\ No newline at end of file[m
[1mdiff --git a/controllers/productController.js b/controllers/productController.js[m
[1mindex 4994765..4a7525a 100644[m
[1m--- a/controllers/productController.js[m
[1m+++ b/controllers/productController.js[m
[36m@@ -18,7 +18,8 @@[m [mexport const getAll = async (req, res) => {[m
   const limit = 10;[m
   const skip = (page - 1) * limit;[m
   try {[m
[31m-    const allProducts = await ProductSchema.find().skip(skip).limit(limit);[m
[32m+[m[32m    const allProducts = await ProductSchema.find().populate("categoryID", "name")[m
[32m+[m[32m    .populate("subCategoryID", "name").skip(skip).limit(limit);[m
     if (!allProducts || allProducts.length == 0) {[m
       return res.status(404).send(" no more products to show !");[m
     }[m
[36m@@ -78,6 +79,9 @@[m [mexport const updateProduct = async (req, res) => {[m
       type,[m
       description,[m
       arabicName,[m
[32m+[m[32m      subCategory,[m
[32m+[m[32m      category[m
[32m+[m[41m      [m
     } = req.body;[m
     const images = req.files ? req.files.map((image) => image.filename) : null;[m
 [m
[36m@@ -94,6 +98,8 @@[m [mexport const updateProduct = async (req, res) => {[m
             details: details,[m
             type: type,[m
             description: description,[m
[32m+[m[32m            subCategoryID: subCategory,[m
[32m+[m[32m            categoryID:category[m
           },[m
         }[m
       );[m
[1mdiff --git a/routes/orderRoutes.js b/routes/orderRoutes.js[m
[1mindex a6a649d..f1d54cc 100644[m
[1m--- a/routes/orderRoutes.js[m
[1m+++ b/routes/orderRoutes.js[m
[36m@@ -12,5 +12,5 @@[m [mexport const orderRouter = express.Router();[m
 orderRouter.post("/create", createOrder);[m
 orderRouter.get("/all", getAllOrders);[m
 orderRouter.get("/:id", getOneOrder);[m
[31m-orderRouter.put(":id", updateOrder);[m
[31m-orderRouter.delete(":id", deleteOrder);[m
[32m+[m[32morderRouter.put("/:id", updateOrder);[m
[32m+[m[32morderRouter.delete("/:id", deleteOrder);[m
