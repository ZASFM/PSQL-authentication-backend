const passport=require('passport');

exports.userAuth=passport.authenticate('jet',{session:false});