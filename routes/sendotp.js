const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const router = express.Router();
router.use(express.json());


const pool = require('../database/pool.js');


// Make the route handler async
router.post('/', async (req, res) => {
    try {
        let email = req.body.email;
        let otp = generateOTP();


        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your One-Time Password (OTP) is: ${otp}`,
            html: `<h2>Verification Code</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <h1 style="color: #2e6da4;">${otp}</h1>
            <p>This OTP is valid for 5 minutes.</p>`
        };

        
        // Send email directly (no nested function needed)
        const info = await transporter.sendMail(mailOptions);


        const [result] = await pool.execute(`INSERT INTO otp_store (email, otp, expires_at) VALUES (?, ?, NOW() + INTERVAL ? MINUTE)`,[email, otp, 5]);
        
        console.log('Email sent successfully');
        console.log('Message ID:', info.messageId);

        console.log('OTP inserted successfully:', result);

        // Send response
        res.status(200).json({
            message: "Email sent successfully",
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'Failed to send email',
            error: error.message
        });
    }
});

module.exports = router;