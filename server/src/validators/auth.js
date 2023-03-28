const {check}=require('express-validator');
const db=require('../db/index');
const bcrypt=require('bcryptjs');

const password=check('password')
.isLength({max:15,min:6})
.withMessage('Password must be at least between 6-15 characters');

const email=check('email').isEmail().withMessage('Email is not correct');

const emailExists=check('email').custom(async(value)=>{
   const {rows}=await db.query('SELECT * FROM users WHERE name=$1',[
      value
   ]);
   if(rows.length){
      throw new Error('Email already exists');
   }
});

const loginFieldsCheck=check('email').custom(async(value,{req})=>{
   try{
      const user=await db.query('SELECT * FROM users WHERE name=$1',[
         value
      ]);
      if(!user.rows.length){
         throw new Error('User does not exists');
      }
      const confirmPassword=await bcrypt.compare(req.body.password,user.rows[0].password);
      if(!confirmPassword){
         throw new Error('Password is incorrect');
      }
      req.user=user.rows[0];
   }catch(err){
      console.log(err);
   }
})

module.exports={
   registerValidation:[password,email,emailExists],
   loginValidation:[loginFieldsCheck]
}