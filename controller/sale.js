const mongoose=require("mongoose");
const Inventory=require("../models/inventory");
const Sale =require("../models/sale");
const query=require("querystring");

exports.getProduct=(req,res)=>{
		const barcode=req.query.barcode;
		Inventory.findOne({barcodeno:barcode})
	    		 .populate("productID")
	    		 .exec((err,product)=>{
	    		   if(err){
	    		   	res.status(400).json({success:false,massage:"Internal Server error"})
	    		   }
	    		  res.status(200).json({success:true,product:product})         		  
	    		 });	

}
exports.createSale=(req,res)=>{
	 
	 var bucket=req.body.bill;
	 var creatBill=new Sale(bucket);
	 creatBill.save((err,bill)=>{
	 	 if(err){
	 	 	res.status(400).json({success:false,message:"Internal server error"});
	 	 }
	 	 res.status(200).json({success:true,bill:bill});
	 });
}
exports.getAllBill=(req,res)=>{

	  Sale.find({}).populate("createdBy","name email").exec((err,bills)=>{
	  	 if(err){
	  	 	 res.status(400).json({success:false,message:"Internal server error"})
	  	 }
	  	 
	  	 res.status(200).json({success:true,bills:bills})
	  })   
}





