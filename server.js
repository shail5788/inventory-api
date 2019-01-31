const express =require("express");
const app=express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
const cors=require("./middleware/middleware");
const port=process.env.PORT||config.serverPort;

const userRoute=require("./routes/user");
const categoryRoute=require("./routes/category");
const productRoute=require("./routes/product");
// router function 
const userM=require("./models/user");
const User=require("./controller/user");
mongoose.Promise = global.Promise;

let connectOptions = {
    useMongoClient: true,
    autoReconnect: true,
}

mongoose.connect(config.database,connectOptions,(err)=>{
     if(err){
     	// console.log(err);
     }else{
     	console.log("database connected successfully");
     }
});

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors.middlewareForCORS);

app.get("/",(req,res)=>{
   res.send(` To access api use this route->localhost:${port}/api/`);
});

app.post("/register",User.signUp);
app.post("/login",User.login)

app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);


app.listen(3000,()=>{
	console.log(`server is running on port -${port}`);
});
