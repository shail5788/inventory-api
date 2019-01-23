const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const categorySchema=new Schema({
	  name:{type:String,require:true},
	  createdAt:{type:Date,Default:Date.now()}
});

module.exports =mongoose.model("category",categorySchema,"Category");