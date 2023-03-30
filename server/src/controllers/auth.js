const db=require('../db/index');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.getUsers=async (req,res,next)=>{
   try{
      const {rows}=await db.query('SELECT id, name, createdat FROM USERS');
      res.status(200).json({
         success:true,
         rows
      })
   }catch(err){
      console.log(err);
   }
}

exports.register=async (req,res,next)=>{
   const {email,password}=req.body;
   const salt=await bcrypt.genSalt(10);
   const hash=await bcrypt.hash(password,salt);
   try{
      await db.query(
         'INSERT INTO users(name,password) VALUES($1,$2)',[
            email,hash
         ]
      );
      res.status(200).json({
         success:true,
         msg:'Registration successful'
      })
   }catch(err){
      console.log(err);
   }
}

exports.login=async (req,res,next)=>{
   try{
      const token=jwt.sign({
         id:req.user.id,
         email:req.user.name
      },process.env.JWT_SECRET);
      res.status(200).
      cookie('token',token,{
         httpOnly:true
      }).
      json({
         success:true,
         msg:'Login successful'
      })
   }catch(err){
      console.log(err);
   }
}


exports.logout=async(req,res,next)=>{
   try{
      res
      .status(200)
      .clearCookie('token',{httpOnly:true})
      .json({
         success:true,
         msg:'Logout successful'
      })
   }catch(err){
      console.log(err);
   }
}