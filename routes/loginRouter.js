let express=require('express');
const router=express.Router();
const {checkEmail}=require('../controller/loginController.js');
router.post('/',checkEmail);
module.exports=router;
