const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Auction = require("../models/auction.model");

const SoldPlayer = async (req, res) => {
    const { franchise_id, auction_id, sold_price, player_id } = req.body;
    const auctioneer_id = req.auctioneer_id; 

    try {
        if (!franchise_id || !auction_id || !sold_price || !player_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find auction
        const auction = await Auction.findOne({ _id: auction_id });
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        // Validate auctioneer
        const isValidAuctioneer = auction.auctioneers.some(
            (obj) => obj.auctioneer_id.toString() === auctioneer_id
        );

        if (!isValidAuctioneer) {
            return res.status(403).json({
                message: "Invalid Auctioneer, this is not your auction",
            });
        }

        // Find player
        const player = auction.players.find(
            (player) => player._id.toString() === player_id
        );
        if (!player) {
            return res
                .status(403)
                .json({ message: "Player is not registered in this Auction!" });
        }

        if (player.status === "Sold") {
            return res
                .status(403)
                .json({ message: "Player is already sold out!" });
        }
        
        // Find franchise
        const franchise = auction.franchises.find(
            (franchise) => franchise.franchise_id.toString() === franchise_id
        );
        if (!franchise) {
            return res.status(403).json({
                message: "Franchise is not registered for the Auction",
            });
        }

        // Update player and franchise details
        if (franchise.total_purse - franchise.spent < sold_price){            
            return res
                .status(403)
                .json({ message: "Insufficient Purse!" });
        }
        player.sold_price = sold_price;
        player.status = "Sold";

        franchise.players = franchise.players || [];
        franchise.spent = franchise.spent || 0;

        franchise.players.push(player_id);
        franchise.spent += sold_price;

        // Save changes
        await auction.save();

        res.status(201).json({
            message: `Player ${player.player_name} successfully sold to ${franchise_id}`,
        });

    } catch (error) {
        console.error("Error selling Player:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { SoldPlayer };
