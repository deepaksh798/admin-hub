const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGO Connected at ${conn.connection.host}`);
  } catch (error) {
    console.log("MONGO ERROR", error);
    process.exit();
  }
};

module.exports = connectDB;
