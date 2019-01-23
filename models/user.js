const mongoose=require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema=new Schema({

	  name:{
	  	first_name:{type:String,require:true},
	     last_name:{type:String,require:true}
	  },
	  gender:{type:String,require:true},
	  username:{type:String,require:true},
	  email:{type:String,require:true},
	  password:{type:String,require:true},
	  last_login:{type:Date,default:Date.now()}

});

userSchema.pre('save', function (next) {
  const users = this,
    SALT_FACTOR = 5;

  if (!users.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(users.password, salt, null, (err, hash) => {
      if (err) return next(err);
      users.password = hash;
      next();
    });
  });
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};


module.exports =mongoose.model("users",userSchema,"Users");