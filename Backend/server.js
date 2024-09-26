const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./configuration/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // to accept the data in JSON format
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
