const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
 name:String,
 skills:String,
 bio:String,
 image:String
});

module.exports = mongoose.model("Portfolio",PortfolioSchema);