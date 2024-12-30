const mongoose = require('mongoose');
const Stats = require('./stat.model'); // Import the Stats model

const playerSchema = new mongoose.Schema({
    player_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId(), 
        unique: true // Ensure uniqueness of the player_id
    },
    set_no: { type: Number, required: true },
    player_name: { type: String, required: true },
    base_price: { type: Number, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Available', 'Sold'], 
        default: 'Available' 
    },
    Type: { 
        type: String, 
        enum: ['batter', 'bowler', 'allrounder', 'keeper'], 
        required: true 
    },
    sold_price: { type: Number, default: 0 },
    stats: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stats', 
        required: true 
    }
});

// Create the Player model
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
