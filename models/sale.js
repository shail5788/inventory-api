const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const saleSchema=new Schema({

	  product:{type:mongoose.Schema.Type.ObjectId,ref:"product"},
	  qty:{type:Number},
	  unitPrice:{type:Number},
	  billNo:{type:Number},
	  discount:{type:Number},
	  createdBy:{type:mongoose.Schema.Type.ObjectId,ref:"user"},
	  createdAt:{type:Date,Default:Date.now()}
})

module.exports=mongoose.model("sale",saleSchema,"Sale");
