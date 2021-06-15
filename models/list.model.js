const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    board_id: { type: "objectId", required: true },
    title: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);
const List = mongoose.model("List", listSchema);

module.exports = List;
