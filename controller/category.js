var mongoose = require( 'mongoose' );
var Category = require('../models/category');
var config = require('../config/config');

exports.createCategory=(req,res)=>{
    
     const cate_name=req.body.name;
     Category.findOnd({name:cate_name}).exec((err,category)=>{
     	  if(err){
     	  	res.status(502).json({success:false,massage:"Internal Server errror"})
     	  }
     	  if(category){
     	     res.status(401).json({success:false,message:"category already Exist!"})
     	  }else{
     	  	 
     	  	 var newCategory=new Category({
     	  	 	 name:cate_name
     	  	 });
     	  	 newCategory.save().exec((err,category)=>{
     	  	 	  if(err){res.status(300).json({success:false,message:"Internal server error"})}
     	  	 	  return res.status(200).json({success:true,category:category});	
     	  	 })
     	  }
	 });
}
exports.getAllCategory=(req,res)=>{

	  Category.find({}).exec((err,categories)=>{
	  	  if(err){res.status(502).json({success:false,message:"Internal server error"})}
	  	  return res.status(200).json({success:true,categories:categories});
	  });
}
exports.getSingleCategory=(req,res)=>{
  
    const cate_id=req.params.id;
    Category.find({_id:cate_id}).exec((err,category)=>{
    	 if(err){res.status(500).json({success:false,message:"Internal server error"})}
      return res.status(200).json({success:true,category:category})
    })       
}
