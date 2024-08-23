const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => req.params.id === c._id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
