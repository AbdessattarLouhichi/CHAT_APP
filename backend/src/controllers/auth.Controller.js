import User from '../models/user.model.js'
import Token from '../models/token.model.js';
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from '../utils/mail.js';

// Register new user
export const signup = async (req,res)=>{
    const { fullName , email, password, profilePic} = req.body
    try {
        
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }

        // Check if user exists
        const userExists = await User.findOne({email : email})
       
        if (userExists){
            res.status(400).json({message : 'Email is already  used'})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName,
            email,
            password : hashedPassword,
            profilePic
        })
        // save user
        if(newUser){
            await newUser.save()
        }
        
    
        res.status(201).json({message :  'User added successfully!'})

    } catch (error) {
        res.status(500).json({message : error.message})
    } 
}


// login user
export const login = async (req,res)=>{
    try {
       const {email, password} = req.body;

       // find user
        const user = await User.findOne({email : email})
       
        if(!user){
           return res.status(400).json({message : "user does not exist"})
        }
            const passMatch = await bcrypt.compare(password, user.password);
            if(!passMatch){return res.status(400).json({message : "check your email or your password!"})};
            
            // generate user token
            const data={
                userId : user._id,
                userEmail:user.email,
                role: user.role 
            }
            const token = jwt.sign(data,process.env.SECRET_KEY, {expiresIn : '2h'});

            return res.status(200).json({id: user._id, token: token, message : "successfully logged in"});  

    } catch (error) {
        res.status(500).json({message :"Server Error"})
    }
}

// logout 
export const logout = async (req, res) => {
    try {
      await req.logout((err) => {
        if (err) {
          res.status(500).json({ message:  err.message  });
        } else {
          res.json({ message: "Successfully Logged Out" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

//Forgot Password
export const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body;
        console.log(email)
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "user with given email doesn't exist"})
        }
        await Token.findOneAndRemove({userId : user._id })
        const JWT_SECRET = crypto.randomBytes(32).toString("hex");
        const data={
            userId : user._id,
            userEmail:user.email
        }
        // generate reset link
        const resetToken = jwt.sign(data, JWT_SECRET, {expiresIn : "10m"});
        await Token.create({
            userId : user._id ,
            token : resetToken
        })
        const link = `${clientURL}/resetPassword/${resetToken}`;
        await sendEmail(email,"Reset Password",{name : user.fullName ,link : link},"./templates/resetPassword.ejs")
        res.status(200).json({message : `Password reset link has been sent to ${email}`});
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Server Error!"})
    }
}

// Reset Password
export const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params
        const {password} = req.body
    
        const resetToken = await Token.findOne({ token : token})
        const user = await User.findById(resetToken.userId)
       if(!resetToken){
        return res.status(400).json({message : 'invalid link or expired'})
       }
        // hashing the newPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.updateOne({_id : user._id},{$set : {password : hashedPassword}},{new : true});
        await resetToken.delete();
        await sendEmail(user.email,"Change Password confirmation",{name :user.fullName},"./templates/confirmResetPassword.ejs")
        res.status(200).json({message : "Password changed successfully. Please login with your new password"});
        

    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Server Error'})
    }
}