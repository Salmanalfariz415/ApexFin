let bcrypt=require('bcrypt');
const userRegister=async (req,res)=>{
    const pass=req.body.pass;
    const email=req.body.pass;
    await pool.execute('INSERT INTO user_details (email, password, created_at) VALUES (?, ?, NOW())',[email, pass]);
}
module.exports={userRegister};