const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
  {
    email: String,
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minLength: 7
    },
    country: String,
    image: String,
    bio: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);
