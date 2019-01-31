const user=require("../controller/user");
const category=require("../controller/category");
const router=require("express").Router();


router.get("/",(req,res)=>{
	 res.status(200).json({message:"api route"})
});

router.use(user.authenticate) ;
// category Route
router.route("/category")
	  .get(category.getAllCategory)
	  .post(category.createCategory)

router.route("/category/:id")
	  .get(category.getSingleCategory)
	  

module.exports=router;	  