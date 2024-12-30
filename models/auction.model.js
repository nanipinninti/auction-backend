const mongoose = require('mongoose');
const Player = require('./player.model');
const Franchise = require('./franchise.model');
const Set = require('./set.model');
const Customer = require('./customer.model'); // Assuming you have a Customer model

const auctionSchema = new mongoose.Schema({
    customer_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    auction_name: { 
        type: String, 
        required: true 
    },
    auction_date: { 
        type: String, 
        required: true 
    },
    auction_time: { 
        type: String, 
        required: true 
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    franchises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Franchise'
        }
    ],
    sets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Set'
        }
    ]
});

// Create the Auction model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
