module.exports ={
     isAdmin:function(req,res,next){
	     if(!req.decoded._doc.role.isAdmin){
	        res.status(403).json({success:false,message:"access forbidden"})  
	     }
	    next();
	 
	 },
	 isManager:function(req,res,next){
	 	if(!req.decoded._doc.role.isManager){
	        res.status(403).json({success:false,message:"access forbidden"})  
	     }
	    next();
	 },
	 isUser:function(req,res,next){
	 	 if(!req.decoded._doc.role.isManager){
	        res.status(403).json({success:false,message:"access forbidden"})  
	     }
	    next();
	 },
	 topLevel:function(req,res,next){
	 	 if(req.decoded._doc.role.isUser){
	 	  return res.status(403).json({success:false,message:"Forbidden to access this resource"})
	 	 }
	 	 next()
	 }
      

}