const user=require("../controller/user");
const stock =require("../controller/stocks")
const router=require("express").Router();


router.get("/",(req,res)=>{
	res.status(202).json({message:"api route"});
})

router.use(user.authenticate);

router.route("/stock")
	  .get(stock.getAllStock)
	  .post(stock.createStock)

router.route("/stock/:id")
	  .get(stock.getSingleProductStock)	

module.exports=router;