const express=require('express');
const router=express.Router();
router.use(express.json());

const pool = require('../database/pool.js');


router.post('/',async(req,res)=>{
    let otp=req.body.otp;
    let email=req.body.email;
    let [result]=await pool.query('SELECT otp, expires_at FROM otp_store WHERE email = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',[email]);
    finalotp=result.otp;
    try{
        if (otp === storedOtp) {
            // Optional: Delete OTP after successful verification to prevent reuse
            await pool.query('DELETE FROM otp_store WHERE email = ?', [email]);
            
            res.status(200).json({
                message: 'OTP verified successfully'
            });
        } else {
            res.status(400).json({
                message: 'Invalid OTP'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Failed to verify OTP'
        })
    }

})

module.exports=router;