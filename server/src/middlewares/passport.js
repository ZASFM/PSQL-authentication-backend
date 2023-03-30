const passport=require('passport');
const {Strategy}=require('passport-jwt');
const db=require('../db/index');

const cookieExtractor=async(req)=>{
   let token=null;
   if(req && req.cookies) token=req.cookies['token'];
   return token;
}

const opts={
   secretOrKey:process.env.JWT_SECRET,
   jwtFromRequest:cookieExtractor
}

passport.use(
   new Strategy(opts,async({id},done)=>{
      try{
         const {rows}=await db.query(
            'SELECT * FROM users WHERE id=$1',
            [id]
         );
         if(!rows.length){
            throw new Error('401, unauthenticated');
         }
         let user={
            id:rows[0].id,
            email:rows[0].email
         }
         return await done(null,user);
      }catch(err){
         console.log(err);
         done(null,false)
      }
   })
)
