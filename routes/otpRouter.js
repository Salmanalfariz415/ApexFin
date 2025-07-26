let express=require('express');
const router=express.Router();
const {sendEmail,otpCheck} = require('../controller/otpController.js');

router.post('/send/email',sendEmail);
router.post('/send/otp',otpCheck);


module.exports=router;