import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "1d"
    });
    return token;
}


export const registerUser = async(req,res)=>{
    try{
        const {userName,email,password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({
            status : false,
            errror : "All fields are required"
        })
    }

    const userExists = await User.findOne({
        $or : [{email},{userName}]
    })

    if(userExists){
        return res.status(400).json({
            success : false,
            error : 
            userExists.email === email 
            ? "email is already exists"
            : "Username already taked"
        });
    }

    const user = await User.create({
        userName,
        email,
        password
    })

    res.status(201).json({
        success : true,
        data : {
            user : {
                id : user._id,
                userName : user.userName,
                email : user.email
            },
            token : generateToken(user._id)
        }
    })
    
} 
catch(error){
    console.log(`error : ${error.message}`);
    res.status(500).json({
        success : false,
        error : "Server error"
    })
}
}

export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                error : "All fields are required"
            })
        }
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success : false,
                error : "Invalid credentials"
        })}
        
        if(!(await user.matchPassword(password))){
            return res.status(400).json({
                success : false,
                error : "Incorrect password"
            })
        }

        res.status(200).json({
            success : true,
            data : {
                user : {
                    id : user._id,
                    userName : user.userName,
                    email : user.email
                },
                token : generateToken(user._id)
            }
        })

    }catch(error){
        console.log(`error : ${error.message}`);
        res.status(500).json({
            success : false,
            error : "Server error"
        })
    }
}

export const getMe = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success : true,
            data : {
                user : user
            }
        })
    }catch(error){
        console.log(`error : ${error.message}`);
        res.status(500).json({
            success : false,
            error : "Server error"
        })
    }
}