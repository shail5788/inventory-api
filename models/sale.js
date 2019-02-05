const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;



const saleSchema=new Schema({                              
      
      billNo:{type:String},
	  itemsBucket:[{
	  	product:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
	  	qty:{type:Number},
	  	unitPrice:{type:Number},
	  	discount:{type:Number},
	  }],
	   total:{type:Number,Default:0.0},
	   totalDescount:{type:Number,Default:0.0},	
	   createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
	   createdAt:{type:Date,Default:Date.now()}

});

module.exports =mongoose.model("sale",saleSchema,"Sale");
