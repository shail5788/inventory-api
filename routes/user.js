const user=require("../controller/user");
const router=require("express").Router();

router.get("/",user.signUp)

module.exports=router;

