let express=require('express');
const router=express.Router();

const {userRegister}=require('../controller/userDetailsController.js');

router.post('/send/email',userRegister)

module.exports=router;