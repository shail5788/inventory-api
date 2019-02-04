const mongoose=require("mongoose");
const Inventory=require("../models/inventory");

exports.getAllProductInventory=(req,res)=>{

	  Inventory.find({})
	  		   .populate("productID")
	  		   .exec((err,products)=>{
	  		   	  if(err){
	  		   	  	res.status(404).json({success:false,message:"Internal Server error"});
	  		   	  }
	  		   	  res.status(200).json({success:true,total:products.length,products:products});
	  		   });
}
exports.getProductInventrory=(req,res)=>{
        barcode=req.params.id;  
	    Inventory.findOne({barcodeno:barcode})
	    		 .populate("productID")
	             .exec((err,product)=>{
                 if(err){res.status(400).json({success:true,message:"Internal Server Error"})}
                 res.status(200).json({success:true,product:product}) 	
	    })       
}
