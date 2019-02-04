const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const productSchema=new Schema({

	  productName:{type:String,require:true},
	  barcodeno:{type:String},
	  brand:{type:String,require:true},
	  category:{type: mongoose.Schema.Types.ObjectId, ref: "category"},
	  unit_price:{type:String,require:true},
	  size:{type:String,require:true}
});

module.exports =mongoose.model("products",productSchema,"Products");