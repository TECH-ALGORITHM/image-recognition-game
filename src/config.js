const mongoose = require("mongoose");
MONGODB_CONNECT_URI =
  "mongodb+srv://joy212ambuj:ambuj123456@login-new.jwizbr8.mongodb.net/merngg?retryWrites=true&w=majority&appName=login-new";

mongoose
  .connect(MONGODB_CONNECT_URI)
  .then(() => {
    console.log("connection success");
  })
  .catch((error) => console.log("failed   ++++" + error.message));
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("user", loginSchema);
module.exports = collection;
