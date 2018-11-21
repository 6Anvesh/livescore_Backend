var jwt = require('jsonwebtoken');
var secret = 'sudhakar@redddy';
module.exports ={
    createToken : (user)=>{
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate()+60);
    
        return jwt.sign({
            id: user._id,
            email: user.email,
            role:user.role,
            exp: parseInt(exp.getTime() / 1000),
        }, secret);
    }
}