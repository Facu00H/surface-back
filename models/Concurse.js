const mongoose = require("mongoose");

const concurseSchema = new mongoose.Schema({
  name: { type: mongoose.Types.ObjectId, ref: "users" },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  likes: { type: Array, required: true },
});

const User = mongoose.model("concurses", userSchema);
module.exports = User;