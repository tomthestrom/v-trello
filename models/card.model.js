const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    _id: { type: "objectId", required: true },
    description: { type: "string", required: false },
    list_id: { type: "objectId", required: true },
    title: { type: "string", required: true }
}, {
  timestamps: true,
});
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;