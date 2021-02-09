const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const boardSchema = new Schema({
    description: { type: "string", required: false },
    title: { type: "string", required: true }
}, {
  timestamps: true,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;