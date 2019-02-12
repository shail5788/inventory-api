const user=require("../controller/user");
const stock =require("../controller/stocks");
const auth=require("../middleware/auth");
const router=require("express").Router();


router.get("/",(req,res)=>{
	res.status(202).json({message:"api route"});
})

router.use(user.authenticate);

router.route("/stock")
	  .get(auth.topLevel,stock.getAllStock)
	  .post(stock.createStock)

router.route("/stock/:id")
	  .get(stock.getSingleProductStock)
	  .put(auth.isAdmin,stock.updateProduct)	

module.exports=router;