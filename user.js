const {Router} = require('express');
const User = require("../models/user");
const { model } = require("mongoose");

const router = Router();


router.get('/signin',(req,res)=>{
    return res.render("signin");
});

router.get('/signup',(req,res)=>{
    return res.render("signup");
});

router.get('/info',(req,res)=>{
    return res.render("info");
});

router.post('/signin',async(req,res)=>{
    try{
     const {email,password} = req.body;
     const token= await User.matchPasswordAndGenerateToken(email,password);
      return res.cookie("token",token).redirect("/");
    }catch(error){
     return res.render("signup",{
         error:'Incorrect Email or password'
     })
    }
 });

 router.post('/signin',async(req,res)=>{
    try{
     const {email,password} = req.body;
     const token= await User.matchPasswordAndGenerateToken(email,password);
      return res.cookie("token",token).redirect("/");
    }catch(error){
     return res.render("signup",{
         error:'Incorrect Email or password'
     })
    }
 });

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
});

module.exports= router ;

