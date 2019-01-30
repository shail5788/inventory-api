const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const stockSchema=new Schema({
      
      productID:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
	  qty:{type:Number,default:0},
	  remainingQty:{type:Number,default:0},
	

});

module.exports =mongoose.model("products",productSchema,"Products");

