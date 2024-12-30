const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  franchise_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() // MongoDB auto-generates a unique ObjectId
  },
  franchise_name: { type: String, required: true, unique: true },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
  total_purse: { type: Number, required: true },
  spent: { type: Number, default: 0 }
});

// Create the model
const Franchise = mongoose.model('Franchise', franchiseSchema);

module.exports = Franchise;
