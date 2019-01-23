const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema=new Schema({

	  first_name:{type:String,require:true},
	  last_name:{type:String,require:true},
	  gender:{type:String,require:true},
	  username:{type:String,require:true},
	  email:{type:String,require:true},
	  password:{type:String,require:true},
	  last_login:{type:String,require:true}

});

module.exports =mongoose.model("users",userSchema,"Users");