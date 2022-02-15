require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 1337;

const isProd = (process.env.NODE_ENV || "development") === "production";

const auth = require("./controllers/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: isProd ? "https://backend.mysite.com" : "http://localhost:5000",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL).catch((e) => {
  console.error(e);
  process.exit(1);
});

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
