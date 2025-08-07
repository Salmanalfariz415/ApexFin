let express=require('express');
const router=express.Router();
const validate=require('../middleware/jwtHandler.js');

router.get('/', validate, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/main.html'));
});

module.exports=router;