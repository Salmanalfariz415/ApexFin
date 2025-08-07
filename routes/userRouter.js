let express=require('express');
const router=express.Router();
const validate=require('../middleware/jwtHandler.js');
const {userRegister}=require('../controller/userDetailsController.js');

router.post('/send/email',userRegister);

router.get('/main', validate, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/main.html'));
});


module.exports=router;