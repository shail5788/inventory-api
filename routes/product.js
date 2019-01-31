const user=require("../controller/user");
const product =require("../controller/product")
const router=require("express").Router();


router.get("/",(req,res)=>{
	res.status(202).json({message:"api route"});
})
 
router.use(user.authenticate);

// Product Route

router.route("/product")
	  .get(product.getAllProduct)
	  .post(product.createProducts)
router.route("/product/:id")
	  .get(product.getProduct)
	  .post((req,res)=>{
	  	res.status(200).json({message:"create product"})
	  })
module.exports=router;