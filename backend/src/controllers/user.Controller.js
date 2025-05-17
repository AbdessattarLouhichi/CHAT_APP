import User from "../models/user.model.js";


// find all users 
export const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

//find one user by Id
export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// update user
export const updateUser = async (req,res)=>{
    try {
        const { profilePic } = req.body;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        
        await User.findByIdAndUpdate(req.params.id, {
            profilePic: uploadResponse.secure_url
         },
        {new: true});
        const user = await User.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!", user : user})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// delete user
export const deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "user deleted!"})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};
