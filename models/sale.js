const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const mongoosePaginate=require("mongoose-paginate");
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
	   created_at:{type:Date,require:true},
	   createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
	
});
saleSchema.plugin(mongoosePaginate);

saleSchema.pre("save",(next)=>{
	now =new Date();
	this.created_at=now;
	console.log(this.created_at);
	next();
})
module.exports =mongoose.model("sale",saleSchema,"Sale");
