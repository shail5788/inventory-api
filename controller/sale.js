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
	 
	     Sale.find({billNo:bucket.billNo}).exec((err,bill)=>{
	  	 if(err){res.status(400).json({success:false,message:"Internal server error"})}
	     if(bill.length==0){
	   		  var creatBill=new Sale(bucket);
			  creatBill.save((err,bill)=>{
			 	 if(err){
			 	 	res.status(400).json({success:false,message:"Internal server error"});
			 	 }
				 for(var product of bill.itemsBucket){
			 	 	
			 	 	Inventory.findOne({productID:product.product}).exec((err,item)=>{
			 	 		 if(err){res.status(400).json({success:false,message:"Inventory is miss matched"})}
			 	 	     
			 	 	     item.remQty=item.remQty-product.qty;
			 	 	     item.save((err,updatedItem)=>{
			 	 	     	if(err){res.status(400).json({success:false,message:"error while updating the inventory"})}
			 	 	     })
					})
			 	 }
			 	 res.status(200).json({success:true,bill:bill});
			 });
	     }else{
	     	res.status(201).json({success:false,message:"Sorry this bill Exists"})
	     }	 	
	  })
}
exports.getAllBill=(req,res)=>{

	  Sale.find({}).populate("createdBy","name email").exec((err,bills)=>{
	  	 if(err){
	  	 	 res.status(400).json({success:false,message:"Internal server error"})
	  	 }
	  	 var option={
	  	 	path:'itemsBucket.product',
	  	 	model:"products"
	  	 }
         Sale.populate(bills,option,(err,bills)=>{
	    	 res.status(200).json({success:true,bills:bills})
	     });	 
	  	 
	  })   
}

exports.getSingleBill=(req,res)=>{

	    const billNo=req.params.id;
	    console.log(billNo);
	    Sale.find({billNo:billNo}).populate("createdBy","name email").exec((err,bills)=>{
	  	 if(err){
	  	 	 res.status(400).json({success:false,message:"Internal server error"})
	  	 }
	  	 
	  	 var option={
	  	 	path:'itemsBucket.product',
	  	 	model:"products"
	  	 }
         Sale.populate(bills,option,(err,bills)=>{
	    	 res.status(200).json({success:true,bills:bills})
	    });	 
	  	 
	  }) 
}





