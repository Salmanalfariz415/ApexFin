let bcrypt=require('bcrypt');
const pool = require('../database/pool'); 
const checkEmail=async (req,res)=>{
    try{
        let email=req.body.email;
        let pass=req.body.password;
        if (!email || !pass) return res.status(400).json({ message: 'Missing fields' });
        const [storedHashedPassword] = await pool.execute('SELECT password FROM user_details WHERE email = ?',[email]);
        const match = await bcrypt.compare(pass, storedHashedPassword[0]);
        if (match) {
            return res.status(200).json({ message: 'Password is correct' });
        }else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    }
    catch(err){
        res.status(500).json({
            error:err.message,
        }
        )
    }
}
module.exports=checkEmail;