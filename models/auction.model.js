const mongoose = require('mongoose');
const playerSchema = require('./player.schema');
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
    franchises: [
        { 
            franchise_id : {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Franchise', 
                required: true 
            },
            players: [
                {
                    type: String
                }
            ],
            total_purse: { type: Number, required: true },
            spent: { type: Number, default: 0 }
        }        
    ],
    sets: [setSchema],
    auctioneers : [
        {       
            auctioneer_id : 
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Auctioneer', 
                required: true 
            }
        }
    ],
    
},{
    // Additional schema options
    validateBeforeSave: true
});


// Add custom validation for max length
auctionSchema.path('auctioneers').validate(function (value) {
    return value.length <= 3; // Ensures the array has a max length of 3
}, 'The maximum number of auctioneers allowed is 3.');
// Create the Auction model

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
