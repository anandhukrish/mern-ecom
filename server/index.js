require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConfig } = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

//shop routes
const shopProductsRouter = require("./routes/shop/product.routes");
const shopCartRouter = require("./routes/shop/cart.routes");
const shopAddressRouter = require("./routes/shop/address.routes");
const shopOrderRouter = require("./routes/shop/order.routes");
const shopSearchRouter = require("./routes/shop/search.routes");
const shopReviewRouter = require("./routes/shop/review.routes");

const commonFeatureRouter = require("./routes/common/feature.routes");

dbConfig();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ data: "api running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productRoutes);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});
