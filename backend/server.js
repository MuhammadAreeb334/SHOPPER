import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import productRouter from "./src/route/productRoutes.js";
import authRouter from "./src/route/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Shopper is runnung...." });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB:", error.message);
    process.exit(1);
  }
};
startServer();
