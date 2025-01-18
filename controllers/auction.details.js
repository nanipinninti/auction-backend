const express = require("express")
const Auction = require("../models/auction.model")
const {mongoose} = require("mongoose")

const SoldPlayers = async (req,res)=>{
    const {auction_id} = req.query
    if (!auction_id){
        return res
                .status(401)
                .json({
                    success : false, 
                    message : "Auction Id is required"
                })
    }
    try{
        // const object_id = new mongoose.Types.ObjectId(auction_id)
        // console.log(object_id,auction_id)
        const auction = await Auction.findOne({_id : auction_id})
        if (!auction){
            return res
            .status(401)
            .json({
                success : false, 
                message : "Auction doesn't existed"
            })
        }
        const sold_players = auction.players.filter(player=>player.status==="Sold")
        return res
            .status(201)
            .json({
                success : true, 
                sold_players
            })
    }catch(error){
        console.log("Error while getting sold player list : ",error)
        res
        .status(501)
        .json({
            success : false,
            error : error.message
        })
    }
}

const CurrentStatus = async (req,res)=>{
    const {auction_id} = req.query
    if (!auction_id){
        return res
                .status(401)
                .json({
                    success : false, 
                    message : "Auction Id is required"
                })
    }
    try{
        const auction = await Auction.findOne({_id : auction_id})
        if (!auction){
            return res
            .status(401)
            .json({
                success : false, 
                message : "Auction doesn't existed"
            })
        }
        return res
            .status(201)
            .json({
                success : true, 
                current_status : auction.status
            })
    }catch(error){
        console.log("Error to get Status : ",error)
        res
        .status(501)
        .json({
            success : false,
            error : error.message
        })
    }
}

const UnSoldPlayers = async (req,res)=>{
    const {auction_id} = req.query
    if (!auction_id){
        return res
                .status(401)
                .json({
                    success : false, 
                    message : "Auction Id is required"
                })
    }
    try{
        // const object_id = new mongoose.Types.ObjectId(auction_id)
        // console.log(object_id,auction_id)
        const auction = await Auction.findOne({_id : auction_id})
        if (!auction){
            return res
            .status(401)
            .json({
                success : false, 
                message : "Auction doesn't existed"
            })
        }
        const un_sold_players = auction.players.filter(player=>player.status==="Unsold")
        return res
            .status(201)
            .json({
                success : true, 
                un_sold_players
            })
    }catch(error){
        console.log("Error while getting un-sold player list : ",error)
        res
        .status(501)
        .json({
            success : false,
            error : error.message
        })
    }
}

const TopBuys = async (req,res)=>{
    const {auction_id} = req.query
    if (!auction_id){
        return res
                .status(401)
                .json({
                    success : false, 
                    message : "Auction Id is required"
                })
    }
    try{
        // const object_id = new mongoose.Types.ObjectId(auction_id)
        // console.log(object_id,auction_id)
        const auction = await Auction.findOne({_id : auction_id})
        if (!auction){
            return res
            .status(401)
            .json({
                success : false, 
                message : "Auction doesn't existed"
            })
        }
        const top_buys = auction.players.filter(player=>player.status==="Sold").sort((a,b)=>(b.sold_price - a.sold_price))
        return res
            .status(201)
            .json({
                success : true, 
                top_buys
            })
    }catch(error){
        console.log("Error while getting un-sold player list : ",error)
        res
        .status(501)
        .json({
            success : false,
            error : error.message
        })
    }
}

module.exports = {SoldPlayers,UnSoldPlayers,TopBuys ,CurrentStatus}