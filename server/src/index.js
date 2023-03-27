const express=require('express');
const app=express();
const {PORT}=require('./constants/index');
const authRouter=require('./routes/auth');
const cors=require('cors');

app.use(cors({
   origin:'http:localhost:8000'
}));
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