const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const inventorySchema=new Schema({                              
      
      productID:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
	  qty:{type:Number,default:0},
	  remQty:{type:Number,default:0},
	  createdAt:{type:Date,default:Date.now()}

});

module.exports =mongoose.model("inventory",inventorySchema,"Inventory");

