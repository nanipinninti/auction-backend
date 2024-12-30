const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  
const setSchema = new mongoose.Schema({
    set_id: { 
      type: String, 
      default: uuidv4,  
      unique: true 
    },
  set_name: { type: String, required: true}, 
  set_no: { type: Number, required: true }
});

module.exports = setSchema;
