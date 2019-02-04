const user=require("../controller/user");
const inventory =require("../controller/inventory")
const router=require("express").Router();


router.get("/",(req,res)=>{
	res.status(202).json({message:"api route"});
})
 
router.use(user.authenticate);

// Inventory Route
router.route("/product-inventory")
	  .get(inventory.getAllProductInventory)
	  
router.route("/product-inventory/:id")
	  .get(inventory.getProductInventrory)
	  .post((req,res)=>{
	  	res.status(200).json({message:"Updated Inventory"})
	  })
module.exports=router;