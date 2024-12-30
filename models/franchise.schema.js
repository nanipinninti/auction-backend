const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  

const franchiseSchema = new mongoose.Schema({
  franchise_id: { 
    type: String, 
    default: uuidv4,  
    unique: true 
  },
  franchise_name: { type: String, required: true, unique: true },
  players: [
    {
      type : String
    }
  ],
  total_purse: { type: Number, required: true },
  spent: { type: Number, default: 0 }
});


module.exports = franchiseSchema;
