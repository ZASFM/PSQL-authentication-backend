require('dotenv').config();

module.exports={
   PORT:process.env.PORT,
   JWT_SECRET:process.env.JET_SECRET,
   CLIENT_URL:process.env.CLIENT_URL,
   SERVER_URL:process.env.SERVER_URL
};