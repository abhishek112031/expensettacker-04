const path=require('path');
const rootDir=require('../util/path');
const User=require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
// const dotenv=require('dotenv');
// dotenv.config();

function invalidInput(input){
    if(input.length===0 || input===undefined){
        return true;
    }
    else{
        return false;
    }

}

function generateAccesstoken(userId,name){
    return jwt.sign({userId:userId,name:name},process.env.SECRET_KEY)
}


exports.getSignUpPage=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','sign-up.html'));

}
exports.postNewUserInfo=(req,res,next)=>{
    const name=req.body.user;
    const email=req.body.email;
    const password=req.body.password;

    if(invalidInput(name) ||invalidInput(email) || invalidInput(password)){
        res.status(400).json({message:"input can not be empty or undefined!"})
    }


    bcrypt.hash(password,11,(err,hash)=>{

        User.create({
            name:name,
            emailId:email,
            password:hash
        })
        .then(()=>{
            res.status(201).json({message:"Congratulations ! User Sign Up successfull"})
        })
        .catch((err)=>{
            res.status(500).json({message:"something went wrong!"})
        })
    })
}
exports.getLogInPage=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','login.html'));

}
exports.postLogIn=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(invalidInput(email) || invalidInput(password)){
        res.status(400).json({message:"input can not be empty or undefined!"})
    }

    User.findAll({where:{emailId:email}})
    .then((user)=>{
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if (err) {
                    res.status(500).json({ success: false, message: 'something went wrong!' })

                }
                if (result === true) {
                    res.status(200).json({ success: true, message: 'Logged in successful', token: generateAccesstoken(user[0].id, user[0].name) })
                }
                else {
                    return res.status(400).json({ success: false, message: 'Incorrect Password! Please refresh the page and Enter again' })

                }
            })
        }
        else {
            return res.status(404).json({ success: false, message: 'user does not exist' })

        }
    })
    .catch(err => {
        res.status(500).json({ message: err, success: false })
    })



}