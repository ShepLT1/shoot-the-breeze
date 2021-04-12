const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessagesSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },

  message: String

}, { timestamps: true });

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;