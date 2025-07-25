let express=require('express');
let router=express.Router();
const {sendOtp,otpCheck} = require('otpController.js');

router.post('/send/otp',sendOtp);


module.exports=router;