const nodemailer = require('nodemailer');
const pool = require('../database/pool'); 
require('dotenv').config();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = generateOTP();

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your One-Time Password (OTP) is: ${otp}`,
      html: `
        <h2>Verification Code</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: #2e6da4;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    await pool.execute(
      `INSERT INTO otp_store (email, otp, expires_at) VALUES (?, ?, NOW() + INTERVAL ? MINUTE)`,
      [email, otp, 5]
    );

    console.log('OTP sent to:', email);
    console.log('Message ID:', info.messageId);

    res.status(200).json({
      message: 'OTP sent successfully',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('OTP sending failed:', error);
    res.status(500).json({
      message: 'Failed to send OTP',
      error: error.message,
    });
  }
};

const otpCheck=async(req,res)=>{
  try{
    let otp=req.body.otp;
    let email=req.body.email;
    let [result]=await pool.query('SELECT otp, expires_at FROM otp_store WHERE email = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',[email]);
    finalotp=result.otp;
    if (otp === storedOtp) {
        await pool.query('DELETE FROM otp_store WHERE email = ?', [email]);
        res.status(200).json({
        message: 'OTP verified successfully'});
      }
    else {
            res.status(400).json({
                message: 'Invalid OTP'
            });
        }
    }
  catch(err){
    res.status(500).json({
      message: 'Failed to verify OTP',
      error:err.message
    })
  }

}

module.exports = { sendEmail, otpCheck };
