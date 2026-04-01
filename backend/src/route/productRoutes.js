import express from "express";
import { uploadProductImages } from "../middleware/uploadProductImages.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.post("/", uploadProductImages, createProduct);
productRouter.delete("/:id", deleteProduct);
// productRouter.post("/json", UploadProductImage);

export default productRouter;
