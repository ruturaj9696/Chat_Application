const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully!");
  } catch (error) {
    console.error("DB connection failed!", error);
    process.exit(1); // Exit the process if the connection fails
  }
};
module.exports = {
  connectDB,
};
