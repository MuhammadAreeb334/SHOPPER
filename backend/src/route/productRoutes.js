import express from "express";
import { uploadProductImages } from "../middleware/uploadProductImages.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/", uploadProductImages, createProduct);
productRouter.patch("/:id", uploadProductImages, updateProduct);
productRouter.delete("/:id", deleteProduct);
// productRouter.post("/json", UploadProductImage);

export default productRouter;
