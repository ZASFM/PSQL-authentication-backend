const express=require('express');
const app=express();
const {PORT}=require('./constants/index');
const authRouter=require('./routes/auth');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport=require('passport');
require('./middlewares/passport');

app.use(express.json());
app.use(cors({
   origin:'http:localhost:8000',
   credentials:true
}));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/v1',authRouter);

const appStart=()=>{
   try{
      app.listen(PORT,()=>{
         console.log(`App listening on port ${PORT}`);
      })
   }catch(err){
      console.log(err);
   }
}
appStart();