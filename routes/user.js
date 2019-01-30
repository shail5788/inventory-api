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

// category Route
router.route("/category")
	  .get((req,res)=>{
	  	res.status(200).json({message:"get category"})
	  })
	  .post((req,res)=>{
	  	res.status(200).json({message:"create category"})
	  })

router.route("/category/:id")
	  .get((req,res)=>{
	  	res.status(200).json({message:"get category"})
	  })
	  .post((req,res)=>{
	  	res.status(200).json({message:"create category"})
	  })
// Product Route

router.route("/product")
	  .get((req,res)=>{
	  	res.status(200).json({message:"get product"})
	  })
	  .post((req,res)=>{
	  	res.status(200).json({message:"create product"})
	  })
router.route("/product/:id")
	  .get((req,res)=>{
	  	res.status(200).json({message:"get product"})
	  })
	  .post((req,res)=>{
	  	res.status(200).json({message:"create product"})
	  })
	     



module.exports=router;

