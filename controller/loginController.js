const bcrypt=require('bcrypt');
const pool = require('../database/pool'); 
const checkEmail=async (req,res)=>{
    if (!req.body) {
        console.error('Error: Request body is missing or undefined.');
        return res.status(400).json({ message: 'Request body is required.' });
    }
    try{
        let { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

        const [storedHashedPassword] = await pool.execute('SELECT password FROM user_details WHERE email = ?',[email]);
        const match = await bcrypt.compare(password, storedHashedPassword[0].password);
        const loginTime = new Date();
        if (match) {
            await pool.execute('INSERT INTO login_logs (email,login_time) VALUES (?,?)',[email,loginTime]);
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
module.exports={checkEmail};