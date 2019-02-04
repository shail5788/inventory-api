const mongoose=require("mongoose");
const Stock=require("../models/stock");
const Inventory=require("../models/inventory");

exports.createStock=(req,res)=>{
      const productID=req.body.productID;
      const qty =req.body.qty;
      const remQty=req.body.remQty;
      const userid=req.body.userid;
      const trader=req.body.trader;
      const billNo=req.body.invoice;
      const rate =req.body.rate;
      const total=req.body.total;

      if(productID!=""&& qty!="" && remQty!=""){
          
          var newStock=new Stock({
          	 productID:productID,
          	 qty:qty,
             traderName:trader,
             invoiceNo:billNo,
             rate:rate,
             total:total,
             userid:userid
          }); 


          
          newStock.save((err,stock)=>{
             if(err){
               res.status(401).json({success:false,message:"Internal server error"})
             }
             Stock.findOne(stock).populate("productID")
                                 .populate("userid","name email")
                                 .exec((err,curStock)=>{
                                  if(err){
                                     res.status(401).json({success:false,message:"Internal server error"})
                                  }
                                   
                                  var newInventory=Inventory({
                                      productID:productID,
                                      barcodeno:curStock.productID.barcodeno,
                                      qty:qty,
                                      remQty:qty,
                                   })
                                   Inventory.findOne({productID:productID}).exec((err,product)=>{
                                      if(err){
                                         res.status(400).json({success:false,message:"some went wrong"})
                                      }
                                      if(!product){
                                         newInventory.save((err,newProduct)=>{
                                           if(err){res.status(400).json({success:false,message:"some went wrong to create inventroy"})}
                                          
                                         })
                                      }else{
                                         product.qty=product.qty+newInventory.qty;
                                         product.remQty=product.remQty+newInventory.qty;
                                         product.save((err,updatedProduct)=>{
                                          if(err){res.status(400).json({success:false,message:"some went wrong to create inventroy"})}
                                         }) 
                                      }
                                   })
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

	  Stock.find({})
         .populate("productID")
         .populate("userid","name email")
         .exec((err,stocks)=>{
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
