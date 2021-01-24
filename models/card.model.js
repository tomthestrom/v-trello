const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    card_id: { type: ObjectId, required: true },
    description: { type: String, required: false },
    title: { type: String, required: true }
}, {
  timestamps: true,
});
const Card = mongoose.model('Card', CardSchema);

module.exports = Card;