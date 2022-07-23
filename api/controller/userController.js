import User from "../models/User.js";


//UPDATE
export const updateUser = async (req,resp,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        resp.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

//DELETE
export const deleteUser = async (req,resp,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        resp.status(200).json("User has been deleted.");
    }catch(err){
        next(err);
    }
}

//GET
export const getUser = async (req,resp,next)=>{
    try{
        const user = await User.findById(req.params.id);
        resp.status(200).json(user);
    }catch(err){
        next(err);
    }
}

//GET ALL
export const getUsers = async (req,resp,next)=>{
    try{
        const users = await User.find();
        resp.status(200).json(users);
    }catch(err){
        next(err);
    }
}