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

        User.findOne({username:username},(err,user)=>{
        	  if(err){
        	  	res.status(400).json({success:false,message:"Posted data is incorrect or incomplete"});
        	  }
        	  if(user){
        	  	return res.status(201).json({success:false,message:"user is allready exist"});
        	  }
        	var newUser=new User({
        		first_name:firstname,
        		last_name:lastname,
        		gender:gender,
        		username:username,
        		email:email,
        		password:password
        	}); 

        	User.save((err,user)=>{
        		if(err){
        			res.status(401).json({success:false,message:"internal server error"});
        		}
				if(user){
        			return res.status(200).json({success:true,message:"user created successfully!",user:user})
        		}

        	}) 

        }) 

}