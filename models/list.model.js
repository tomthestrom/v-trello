const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    list_id: { type: ObjectId, required: true },
    title: { type: String, required: true }
}, {
  timestamps: true,
});
const List = mongoose.model('List', ListSchema);

module.exports = List;