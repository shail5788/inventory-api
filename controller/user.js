var mongoose = require( 'mongoose' );
var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../config/config');


exports.signUp=(req,res,next)=>{
         
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const gender=req.body.gender;
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;    

        if (!firstname || !lastname || !email || !username || !password) {
          return res.status(403).json({ success: false, message: 'Posted data is not correct or incomplete.'});
        }

        User.findOne({email:email},(err,user)=>{
        	  if(err){
        	  	res.status(400).json({success:false,message:"Posted data is incorrect or incomplete"});
        	  }
        	  if(user){
        	  	return res.status(201).json({success:false,message:"user is allready exist"});
        	  }
        	var newUser=new User({

                name:{
                   first_name:firstname,
                   last_name:lastname
                },
        		gender:gender,
        		username:username,
        		email:email,
        		password:password
        	}); 

        	newUser.save((err,user)=>{
        		if(err){
        			res.status(401).json({success:false,message:"internal server error"});
        		}
				if(user){
        			return res.status(200).json({success:true,message:"user created successfully!",user:user})
        		}

        	}) 

        }) 

}
exports.login=(req,res)=>{

       User.findOne({email:req.body.email}).exec((err,user)=>{
           if(err){
            return res.status(400).json({success:false,message:"Internal server error!"})
           }
           else if(user){
             user.comparePassword(req.body.password,(err,isMatch)=>{
                   if(isMatch && !err){
                     var token=jwt.sign(user,config.secret)
                     user.lastLogin= new Date();
                     user.save((err,user)=>{
                          if(err){res.status(201).json({success:false,message:"Inter server error"})}
                          return res.status(200)
                                    .json({
                                        success:true,
                                        message:"logged in successfully",
                                        user:{
                                               name:user.name,
                                               user_id:user._id,
                                               email:user.email,
                                               token:token
                                            }
                                     })  
                     })
                }else{
                    res.status(401).json({success:false,message:"invalid credentials"})
                }
            });    
        }
       
       })
   
}
exports.authenticate=(req,res,next)=>{
    var token=req.body.token||req.query.token||req.headers['authorization'];
    if(token){
        jwt.verify(token,config.secret,(err,decoded)=>{
              if(err){res.status(505).json({message:"token is invalid"})}
               else{
                req.decoded=decoded;
                next();
               } 
        })
    }else{
        res.status(506).json({message:"token does not exist in request"});
    }
}
exports.getAllUsers=(req,res)=>{

      User.find({}).exec((err,users)=>{
         if(err){
            return res.status(401).json({success:false,message:"Inter server error!"})
         }
         return res.status(200).json({success:true,users:users})
      })
}
exports.getUser=(req,res)=>{
      var id=req.params.id;
      
      User.find({_id:id}).exec((err,users)=>{
         if(err){
            return res.status(401).json({success:false,message:"Inter server error!"})
         }
         return res.status(200).json({success:true,users:users})
      })
}