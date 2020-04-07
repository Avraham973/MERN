/** @format */
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB falid to connect.");
    console.log("====================================");
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

// export default connectDB;
module.exports = connectDB;
