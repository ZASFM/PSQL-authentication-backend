const db=require('../db/index');

exports.getUsers=async (req,res)=>{
   try{
      const resp=await db.query('SELECT * FROM USERS');
      console.log(resp);
   }catch(err){
      console.log(err);
   }
}

exports.register=async (req,res)=>{
   try{
      console.log('validation passed');
   }catch(err){
      console.log(err);
   }
}