const express =require('express');
const app=express();
const asyncHandler=require('express-async-handler');
const res = require('express/lib/response');
const User = require('../models/userModel');
const generateToken=require('../config/generateToken');
const Token =require("../models/token");
const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});


app.get("/userController/:id/verify/:token",async(req,res)=>{
  const user1=await User.findOne({_id: req.params.id});
  if(!user1) return res.status(400).send({message : "invalid link"});
  const token = await Token.findOne({
    userId : user1._id,
    token : req.params.token
  });

  if(!token) return res.status(400).send({message :"invalid link"});

  const user= await User.create({
        name,email,password,pic,
    });
    
    if(user)
        {
             res.status(201).json({
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 pic:user.pic,
                 verified : true,
                 token:generateToken(user._id)
             })

             await token.remove();
        }


        else
        {
            res.status(400);
             throw new Error("failed to create the user");
        }


        

});

const registerUser= asyncHandler(async(req,res)=>{
    const {id,name,email,password,pic}=req.body;

    if(!name||!email||!password)
    {
        res.status(400);
        throw new Error("PLease Enter all the fields");
    }

    const userExists=await User.findOne({email});
 
    const token =await new Token({
      userId : id,
      token : crypto.randomBytes(32).toString("hex")

    }).save();
   console.log("hi",token);
    const url=`http://localhost:3000/userController/${id}/verify/${token.token}`;
    await sendEmail(email,"Verify Email",url);
    res.status(201).send({ message : "An Email is sent to your account please varify"});

    if(userExists)
    {
        res.status(400);
        throw new Error("User Already exists");
    }





});


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });


module.exports={registerUser,authUser,allUsers};