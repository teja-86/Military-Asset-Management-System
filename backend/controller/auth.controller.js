import db from "../config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import transport from "../config/node.mailer.js";
const User = db.User;

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req , res)=>{
  console.log("inside register");
    try{
        const { full_name ,email, password , role_name , base_name}=req.body;
        if( !full_name || !password || !role_name  ){
            return res.status(400).json({messagee:"Missing required fields"});
        }
        const role = await db.Role.findOne({where :{role_name}});
        if(!role){
            return res.status(400).json({message:"Invalid role name"});
        }
        let base = null;

        if (role_name === 'base_commander') {
            if (!base_name) {
               return res.status(400).json({ message: 'Base Commander must be assigned to a base.' });
            }
             base = await db.Base.findOne({ where: { base_name } });
            if (!base) {
                return res.status(400).json({ message: 'Invalid base name' });
            }
        }
        const existingEmail = await User.findOne({where :{email}});
        if(existingEmail){
            return res.status(409).json({message:"Already existed"});
        }
       4

        const newUSer = await db.User.create({
            password_hash:password,
            email ,
            full_name,
            role_id: role.role_id,
            base_id: base ? base.base_id : null

        });
           await transport.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Military Asset Management System",
      html: `
        <h3>Welcome ${full_name}</h3>
        <p>Use the following credentials to login </p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please keep this safe. You can now login with your  password.</p>
      `
    });
        return res.status(201).json({success:true});
        
    }catch(error){
      console.log("catch");
        return res.status(500).json({success:false , message:error.message});
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'email and password are required.' });

    const user = await db.User.findOne({
      where: { email },
      include: [
        { model: db.Role, as: 'role', attributes: ['role_name'] },
        { model: db.Base, as: 'assignedBase', attributes: ['base_name'] }
      ]
    });
  
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role.role_name,
        base_id: user.base_id,
      },
      JWT_SECRET,
      { expiresIn: '5d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite:"none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user:{
        email: user.email,
        role: user.role.role_name,
        base_id: user.base_id
      },
      success:true,
      message: 'Login successful'
      
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ message: "Email and new password are required" });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "Email not found" });
    await user.update({ password_hash: newPassword });

    // Send the password to user's email
    await transport.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Password Has Been Reset",
      html: `
        <h3>Password Reset Successful</h3>
        <p>Your new password has been set.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>New Password:</strong> ${newPassword}</p>
        <p>Please keep this safe. You can now login with your new password.</p>
      `
    });

    return res.json({ success: true, message: "Password reset and sent to email" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req , res)=>{
    try{
        res.clearCookie('token' ,{
            httpOnly:true,secure:process.env.NODE_ENV === 'production' ,
            sameSite:process.env.NODE_ENV==='production'?'none':'strict'
        });
         return res.json({success:true , message:'logged out'});
    }catch(error){
        return res.json({success:false , message:error.message});
    }
}

