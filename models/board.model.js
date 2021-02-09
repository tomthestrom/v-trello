const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const boardSchema = new Schema({
    _id: { type: "objectId", required: true },
    about: { type: "string", required: false },
    bg_color: { type: "string", required: true },
    bg_photo: { type: "string", required: true },
    title: { type: "string", required: true }
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;