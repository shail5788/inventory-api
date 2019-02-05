const user=require("../controller/user");
const Sale=require("../controller/sale");
const router=require("express").Router();

router.get("/",(req,res)=>{
	 res.status(200).json({message:"sale route"})
})


router.use(user.authenticate);
router.route("/sale")
	  .get(Sale.getAllBill)
	  .post(Sale.createSale)
router.route("/sale/bill/:id")
      .get(Sale.getSingleBill)




module.exports =router;	  