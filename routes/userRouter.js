let express=require('express');
const router=express.Router();

const {userRegister}=require('../controller/userDetailsController.js');

router.use('/register',userRegister)

module.exports=router;