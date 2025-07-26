let bcrypt=require('bcrypt');
const pool = require('../database/pool'); 
const userRegister=async (req,res)=>{
    const pass=req.body.pass;
    const email=req.body.email;

    if (!email || !pass) return res.status(400).json({ message: 'Missing fields' });
    try{
        const hashedPassword = await bcrypt.hash(pass, 10);

    await pool.execute('INSERT INTO user_details (email, password, created_at) VALUES (?, ?, NOW())',[email, hashedPassword]);
    res.status(201).json({ message: 'User created' });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
        })
    }
}
module.exports={userRegister};