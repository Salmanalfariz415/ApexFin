const express=require('express');
const router=express.Router();
router.use(express.json());
router.post('/send/otp',async(req,res)=>{
    let otp=req.body.otp;
    res.json({
        message:'otp received'
    })
})