const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    about: { type: String, required: false },
    bg_color: { type: String, required: true },
    bg_photo: { type: String, required: true },
    board_id: { type: ObjectId, required: true },
    title: { type: String, required: true }
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;