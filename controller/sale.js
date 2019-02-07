const mongoose=require("mongoose");
const moment = require('moment')
const Inventory=require("../models/inventory");
const Sale =require("../models/sale");
const query=require("querystring");

const today = moment().startOf('day')

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
	     bucket.created_at=Date.now();
	 
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

	   const {page,perPage,userid,currentDate,paginated} = req.query;
	   var query={};
       (userid)?query['createdBy']=userid:query;
       (currentDate)?query['created_at']={"$gte":today.toDate(), "$lt":  moment(today).endOf('day').toDate()}:delete query['created_at'];
       var option ={
		  page:parseInt(page,10)||1,
          limit:parseInt(perPage,10)||10,
          populate:[{path:"createdBy",select:"email , name"},{path:"itemsBucket.product"}],
       	}
       	if(!paginated){delete option['limit']};
       Sale.paginate(query,option,(err,bills)=>{
          if(err){res.status(400).json({success:false,message:"Internal server error"})}
          res.status(200).json(bills);
       })

}

exports.getSingleBill=(req,res)=>{

	    const billNo=req.params.id;
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





