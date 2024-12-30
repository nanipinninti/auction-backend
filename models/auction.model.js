const mongoose = require('mongoose');
const playerSchema = require('./player.schema');
const franchiseSchema = require('./franchise.schema');
const setSchema = require('./set.schema');
const Customer = require('./customer.model'); // Assuming you have a Customer model

const auctionSchema = new mongoose.Schema({
    customer_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    auction_name: { 
        type: String, 
        required: true ,
        unique : true
    },
    auction_date: { 
        type: String, 
        required: true 
    },
    auction_time: { 
        type: String, 
        required: true 
    },
    players: [playerSchema],
    franchises: [franchiseSchema],
    sets: [setSchema]
});

// Create the Auction model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
