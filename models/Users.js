const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({

  uName: {
    type: String,
    required: "Username required",
  },

  email: {
    type: String,
    required: "Email required",
    unique: true
  },

  password: {
    type: String,
    required: "Password required",
  }

});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;