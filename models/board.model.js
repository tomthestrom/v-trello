const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const boardSchema = new Schema({
    about: { type: string, required: false },
    bg_color: { type: string, required: true },
    bg_photo: { type: string, required: true },
    board_id: { type: objectId, required: true },
    title: { type: string, required: true },
    lists: {type: array, required: false}
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;