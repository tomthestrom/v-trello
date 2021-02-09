const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const boardSchema = new Schema({
    _id: { type: "objectId", required: true },
    // bg_color: { type: "string", required: true },
    // bg_photo: { type: "string", required: true },
    description: { type: "string", required: false },
    title: { type: "string", required: true }
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;