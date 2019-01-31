const mongoose=require("mongoose");
const Product=require("../models/products");

exports.createProducts=(req,res)=>{

	   const productName=req.body.productName;
	   const brand=req.body.brand;
	   const category=req.body.category;
	   const unitPrice=req.body.unitPrice;
	   const size=req.body.size;

	   if(productName!="" && brand!="" && category!="" && unitPrice!="" && size!=""){

	   	    var newProduct=new Product({
	   	    	  productName:productName,
	   	    	  brand:brand,
	   	    	  category:category,
	   	    	  unit_price:unitPrice,
	   	    	  size:size
	   	    })

	   	    Product.findOne({productName:productName,unit_price:unitPrice}).exec((err,product)=>{
	   	    	 if(err){
	   	    	 	res.status(401).json({message:"Internal server error"})
	   	    	 }
	   	    	 if(!product){
                    newProduct.save((err,product)=>{
                    	 if(err){
                    	 	 res.status(402).json({message:"some went wrong while create porduct"})
                    	 }
                        Product.findOne(product).populate("category").exec((err,product)=>{
                       	 res.status(200).json({message:"product created successfully",product:product.populate("category")})	 
                        })	 
                     
                    })
	   	    	 }else{
	   	    	 	res.status(400).json({message:"product all ready created"})
	   	    	 }
	   	    })
	   }
}
exports.getAllProduct=(req,res)=>{
	 Product.find({}).populate('category').exec((err,products)=>{

	 	     if(err){
	 	     	 res.status(401).json({message:"Internal server error"})
	 	     }
	 	     if(products.length==0){
	 	     	res.status(201).json({message:"sorry no product "})
	 	     }
	 	     res.status(200).json({noOfProducts:products.length,products:products})
	 })
}
exports.getProduct=(req,res)=>{
	  var productId=req.params.id;
	 Product.find({_id:productId}).populate("category").exec((err,products)=>{

	 	     if(err){
	 	     	 res.status(401).json({message:"Internal server error"})
	 	     }
	 	     if(products.length==0){
	 	     	res.status(201).json({message:"sorry no product "})
	 	     }
	 	     res.status(200).json({products:products})
	 })
}