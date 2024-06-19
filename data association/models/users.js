const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:270177/miniproject");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
