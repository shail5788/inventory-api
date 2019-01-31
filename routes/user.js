const user=require("../controller/user");
const router=require("express").Router();

router.get("/",(req,res)=>{
	res.status(202).json({message:"api route"});
})
 
router.use(user.authenticate) ;
router.route("/user")
 	   .get(user.getAllUsers)
router.route("/user/:id")
	  .get(user.getUser)
	  
module.exports=router;

