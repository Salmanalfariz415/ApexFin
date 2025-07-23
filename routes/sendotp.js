const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();

// FIXED: Use () to call the Router function
const router = express.Router();

// FIXED: Use express.json() middleware on the router
router.use(express.json());

// Make the route handler async
router.post('/send/email', async (req, res) => {
    try {
        const email = req.body.email;

        // Validate email
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
            subject: 'Test Email',
            text: 'Hello from Node.js!',
            html: '<h1>Hello from Node.js!</h1><p>This is an HTML email.</p>'
        };

        // Send email directly (no nested function needed)
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully');
        console.log('Message ID:', info.messageId);

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

// FIXED: Export the router properly
module.exports = router;