import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import soilReportRoutes from "./routes/soilReportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/soil-reports", soilReportRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is working properly");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected with Database!");
    app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
  })
  .catch((err) => console.error(err.message));
