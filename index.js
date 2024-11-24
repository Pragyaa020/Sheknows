const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app=express();
const PORT=8000;

mongoose.connect('mongodb://localhost:27017/sheknows').then(e=>console.log("MongoDB Connected"));


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.static(path.join(process.cwd(), "/public"))); 

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/',(req,res)=>{
    res.render("home",{
        user:req.user,
    });
})

app.get('/views/signup',(req,res)=>{
    res.render('signup.ejs');
});

app.get('/views/info',(req,res)=>{
    res.render('info.ejs');
});
app.use('/', userRoute);

app.listen(PORT,()=>console.log(`server started at ${PORT}`));
