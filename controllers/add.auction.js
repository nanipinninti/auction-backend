const express = require('express');
const mongoose = require('mongoose');
const Auction = require('../models/auction.model'); // Import the Auction model
const router = express.Router();


const addAuction = async (req, res) => {
    try {
        const customer_id = req.customer_id; // From the authenticated customer
        const { auction_name, auction_date, auction_time, players = [], franchises = [], sets = [] } = req.body;

        // Check for required fields (auction_name, auction_date, etc.)
        if (!auction_name || !auction_date || !auction_time) {
            return res.status(400).json({ message: 'Missing required fields: auction_name, auction_date, auction_time' });
        }

        // Create a new auction document
        const newAuction = new Auction({
            customer_id,
            auction_name,
            auction_date,
            auction_time,
            players, 
            franchises, 
            sets
        });

        // Save the auction to the database
        await newAuction.save();

        // Return the newly created auction in the response
        res.status(201).json({
            message: 'Auction created successfully!',
            auction: newAuction
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating auction', error: error.message });
    }
};

const addSets = async (req,res)=>{
    const {setData} = req.body
    const customer_id = req.customer_id
    console.log(setData,customer_id)
    return res.status(201).json({message :"entered"})
}

module.exports = {addAuction,addSets};
