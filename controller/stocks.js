const mongoose=require("mongoose");
const Stock=require("../models/stock");

exports.createStock=(req,res)=>{
      const productID=req.body.productID;
      const qty =req.body.qty;
      const remQty=req.body.remQty;
      const userid=req.body.userid;
      if(productID!=""&& qty!="" && remQty!=""){
          
          var newStock=new Stock({
          	 productID:productID,
          	 qty:qty,
             userid:userid
          }); 
          
          newStock.save((err,stock)=>{
             if(err){
               res.status(401).json({success:false,message:"Internal server error"})
             }
             Stock.findOne(stock).populate("productID")
                                 .populate("userid")
                                 .exec((err,curStock)=>{
                                  if(err){
                                     res.status(401).json({success:false,message:"Internal server error"})
                                  }
                                   res.status(200).json({success:true,stock:curStock})    
                                 })
          });  
          // Stock.findOne({productID:productID}).exec((err,stock)=>{
          //     if(err){res.status(400).json({massage:"Internal server error"})}
          //     if(!stock){
          //     	newStock.save((err,stock)=>{
          //     		if(err){res.status(401).json({massage:"something went wrongs while creating stock"})}
          //     	    res.status(200).json({success:true,stock:stock})
          //     	})
          //     }else{
          //     	stock.qty=stock.qty+newStock.qty;
          //     	stock.remainingQty=stock.remainingQty+newStock.remainingQty;
          //     	stock.save((err,updatedStock)=>{
          //     		if(err){
          //              res.status(401).json({massage:"something went wrongs while updating stock"})
          //     		}
          //     	res.status(200).json({success:true,stock:updatedStock})	 
          //     	})
          //     }
          // })
      }   

}
exports.getAllStock=(req,res)=>{

	  Stock.find({}).populate("productID").exec((err,stocks)=>{
	  	  if(err){
	  	  	res.status(401).json({message:"Internal server error"})  
	  	  }
	  	res.status(200).json({success:true,total:stocks.length,stocks:stocks})  
	  })
}
exports.getSingleProductStock=(req,res)=>{

	var productId=req.params.id;
	console.log(productId);
	Stock.find({productID:productId}).populate("productID").exec((err,stock)=>{
		if(err){
			res.status(401).json({success:false,message:"Something went wrong"})
		}
		res.status(200).json({success:true,stock:stock})
	});   
}
