const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const stockSchema=new Schema({
      
      productID:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
	  qty:{type:Number,default:0},
	  //remainingQty:{type:Number,default:0},
	  userid:{type: mongoose.Schema.Types.ObjectId, ref: "users"},
	  createdAt:{type:Date,default:Date.now()}

});

module.exports =mongoose.model("stocks",stockSchema,"Stocks");

