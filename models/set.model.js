const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  set_id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, 
  set_name: { type: String, required: true}, 
  set_no: { type: Number, required: true , unique: true }
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
