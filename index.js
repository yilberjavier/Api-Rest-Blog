const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const categoriesRoutes = require("./routes/categories");
const multer = require("multer");

//middleware
app.use(cors());
app.use(express.json());

//conection to database
mongoose
  .connect(process.env.MONGO_URL)
  .then((res = console.log("Coenected to MongoDB")))
  .catch((err) => console.error(err));

// configuration of multer
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, res, cb) => {
    cb(null, "image" + Date.now() + ".jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoriesRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`server listening on port: http://localhost:${port}`);
});
