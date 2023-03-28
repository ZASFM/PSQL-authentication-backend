const {check}=require('express-validator');
const db=require('../db/index');

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

module.exports={
   registerValidation:[password,email,emailExists]
}