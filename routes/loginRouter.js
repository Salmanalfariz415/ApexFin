let express=require('express');
const router=express.Router();
const checkOtp=require('../controller/loginController.js')
router.post('/send',checkOtp);
module.exports=router;
